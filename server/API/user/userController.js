var User = require('./userModel');
var signToken = require('../auth/auth').signToken;
var _ = require('lodash');

exports.getOne = function (req, res, next) {
  var user = req.user;
  User.findOne({ _id: user.id })
  .then(function (users) {
      res.status(200).json(users.toJson());
    }, function (err) {

      next(err);
    });
};

exports.delete = function (req, res, next) {
  var user = req.user;
  User.findOneAndRemove({ _id: user.id })
    .then(function (user) {
      res.status(410).json(user.toJson());
    }, function (err) {

      next(err);
    });

};

exports.put = function (req, res, next) {
  var changedUser = req.body;

  // find supposed user
  User.findOne({ username: req.body.username })
    .then(function (user) {
      if (!user) {
        res.send(401).json({
          success: false,
          message: 'The username/email combination is inccorect',
        });
      }

      //does their email match
      console.log(user);
      console.log(changedUser);
      if (user.email === changedUser.email) {
        _.merge(user, changedUser);
        user.save();
        res.status(200).json(user.toJson());
      }else {
        res.status(401).json({
          success: false,
          message: 'The username/email combination is inccorect',
        });
      }
    });
};

exports.post = function (req, res, next) {
  console.log(req.body);
  var newUser = new User(req.body);

  newUser.save(function (err, user) {
    if (err) { return next(err);}

    var token = signToken(user._id);
    res.status(201).json({ success: true, token: token, user: user.toJson() });
  });
};

exports.notUniqueError = function (err, req, res, next) {
  console.log('notUniqueError middleware run');
  res.status(409).json({
    success: false,
    message: 'User not created message: ' + err.message + ' ' + JSON.stringify(err.errors),
  });
};

exports.getUserList = function (req, res, next) {

  User.find()
    .then((users)=> {
      var userNameList = users.map((user)=> {
        return { username: user.username, _id: user._id };
      });
      res.send(userNameList)
    })
    .catch((err)=>{
      res.send(err)
    })

};
