var router = require('express').Router();
var controller = require('./userController');
var auth = require('../auth/auth');

var authMiddleware = [auth.decodeToken(), auth.getFreshUser()]

router.route('/')
  .get(authMiddleware, controller.getOne)
  .put(authMiddleware, controller.put)
  .post(controller.post, controller.notUniqueError)
  .delete(authMiddleware, controller.delete);

module.exports = router;
