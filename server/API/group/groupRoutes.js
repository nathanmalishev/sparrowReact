var router = require('express').Router();
var controller = require('./groupController');

router.param('id', controller.params);

router.route('/')
  .get(controller.get)
  .post(controller.post)

router.route('/:id')
  .get(controller.getOne)
  .put(controller.put)

router.route('/:id/expenses')
  .get(controller.getExpenses)
  .post(controller.postExpenses)
  .put(controller.put)
  .patch(controller.deleteExpense)


router.route('/:id/chat')
  // .get(controller.getExpenses)
  .post(controller.postChat)

router.route('/:id/settings')
  // .get(controller.getExpenses)
  .post(controller.postUser)


module.exports = router;
