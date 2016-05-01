var User = require('./userModel');
var signToken = require('../auth/auth').signToken;

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
  var user = req.user;
  res.json(req.body);
  User.findOneAndUpdate({ _id: req.user.id }, req.body)
    .then(function (user) {
        res.status(200).json(user.toJson());
      }, function (err) {

      next(err);
    });
};

exports.post = function (req, res, next) {
  var newUser = new User(req.body);

  newUser.save(function (err, user) {
    if (err) { return next(err);}

    var token = signToken(user._id);
    res.status(201).json({ success: true, token: token, user: user.toJson() });
  });
};

exports.notUniqueError = function (err, req, res, next) {
  console.log(err);
  res.status(409).json({
    success: false,
    message: 'User not created message: ' + err.message + ' ' + JSON.stringify(err.errors),
  });
};
