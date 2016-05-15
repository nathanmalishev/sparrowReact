var Group = require('./groupModel');
var _ = require('lodash');
var User = require('../user/userModel');
var mongoose = require('mongoose');

var fields_to_polulate = 'users destinations.hotels.users destinations.flights.users';

exports.params = function (req, res, next, id) {
  Group.findById(id)
    .populate(fields_to_polulate, 'username')
    .exec()
    .then(function (group) {
      if (!group) {
        next(new Error('No Group with that post'));
      }else {
        req.group = group;
        next();
      }
    }, function (err) {

      next(err);
    });
};

exports.getOne = function (req, res, next) {
  res.json({ group: req.group, user: req.user.toJson() });
};

exports.get = function (req, res, next) {

  console.log(req.user.groups);
  Group.find({
    _id: { $in: req.user.groups },
  })
    .populate(fields_to_polulate, 'username')
    .exec()
    .then(function (groups) {
      res.json({ groups: groups, user: req.user.toJson() });
    }, function (err) {

      next(err);
    });
};

exports.getExpenses = function (req, res, next) {
  res.send(req.group.expenses);
};

exports.delete = function (req, res, next) {
  res.send('to do');
};

exports.put = function (req, res, next) {
  //TODO: if user passes in random group id they could update it even if they aren't in it
  //need some auth  --- This should be done before on any group route
  var group = req.group;

  var update = req.body;

  console.log('group', group);
  console.log('update', update);
  group = _.merge(group, update);
  var newGroup = new Group(group);

  console.log('after merge group', group);

  group.save(function (err, saved) {
    if (err) {
      next(err);
    }else {
      res.json(saved);
    }
  });
};

exports.postChat = function (req, res, next) {
  var group = req.group;

  var chat = req.body;
  console.log('group', group);
  console.log('chat', chat);
  group.chat = _.concat(group.chat, chat);
  var newGroup = new Group(group);

  console.log('after merge group', group);

  group.save(function (err, saved) {
    if (err) {
      next(err);
    }else {
      res.json(saved);
    }
  });
};

exports.postUser = function (req, res, next) {
  var group = req.group;

  var user = req.body;

  console.log('group', group);
  console.log('user', user);

  group.users = _.concat(group.users, user.user);
  var newGroup = new Group(group);

  newGroup.save(function (err, saved) {
    if (err) {
      next(err);
    }

    // user.user.groups= (mongoose.Types.ObjectId(newGroup._id));
    User.findById(user.user._id, function (err, user) {
      if (err) {
        console.log(err);
        next(err);
      }

      user.groups.push(mongoose.Types.ObjectId(newGroup._id));
      user.save(function (err, saved) {
        if (err) {next(err);}

        res.json(newGroup);
      });

    });
  });
};

exports.post = function (req, res, next) {
  var newGroup = req.body;
  //add the user to the group
  _.merge(newGroup, { users: [mongoose.Types.ObjectId(req.user._id)] });

  _.merge(newGroup, { destinations: [] });
  console.log(newGroup);
  var newGroup = new Group(newGroup);

  newGroup.save(function (err, group) {
      if (err) {next(err);}
      //add the group to the user
      req.user.groups.push(mongoose.Types.ObjectId(group._id));
      User.findOneAndUpdate({ _id: req.user._id }, req.user, function (err, user) {
        if (err) {
          console.log(err);
          next(err);
        }

        /* FIXME: bit of a hack, but api expects a group to be returned,
          thats populated, meaning USER has username, etc not just the id */
        group.users = [user];

        res.json({ group });
      });
    });
};

exports.postExpenses = function (req, res, next) {
  var group = req.group;
  var newExpenses = req.body;

  console.log('group ', group.expenses);
  console.log('new expenses ', newExpenses.expenses);

  group.expenses = _.concat(group.expenses, newExpenses.expenses);
  console.log('merged after ', group);
  group.save(function (err, savedGroup) {
    if (err) {next(err);}

    res.status(201).send(savedGroup);
  });
};

exports.deleteExpense = function (req, res, next) {
  var group = req.group;

  var expense = req.body.expense;

  group.expenses = _.remove(group.expenses, function (oldExpense) {
    console.log(expense);
    console.log(oldExpense);
    return JSON.stringify(expense) !== JSON.stringify(oldExpense);
  });

  var newGroup = new Group(group);

  newGroup.save(function (err, saved) {
    if (err) {
      next(err);
    }else {
      res.json(saved);
    }
  });
};
