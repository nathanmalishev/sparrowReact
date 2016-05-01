var Group = require('./groupModel');
var _ = require('lodash');

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

exports.getOne = function(req,res,next){
  res.json(req.group)
}


exports.get = function (req, res, next) {
  Group.find()
    .populate(fields_to_polulate, 'username')
    .exec()
    .then(function (groups) {
      res.json(groups);
    }, function (err) {

      next(err);
    });
};

exports.delete = function (req, res, next) {
  res.json({
    username: 'nathan',
  });
};

exports.put = function (req, res, next) {
  //TODO: if user passes in random group id they could update it even if they aren't in it
  //need some auth  --- This should be done before on any group route
  var group = req.group;

  var update = req.body;

  _.merge(group,update);

  group.save(function(err,saved){
    if(err){
      next(err);
    }else{
      res.json(saved);
    }
  })
};

exports.post = function (req, res, next) {
  var newGroup = new Group(req.body);
  newGroup.save(function (err, group) {
      if (err) {next(err);}

      res.json({ group: group });
    });
};
