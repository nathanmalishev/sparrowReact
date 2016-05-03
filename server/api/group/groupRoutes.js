var router = require('express').Router();
var controller = require('./groupController');

router.param('id', controller.params);

router.route('/')
  .get(controller.get)
  .post(controller.post)

router.route('/:id')
  .get(controller.getOne)
  .put(controller.put);

module.exports = router;
