const Router = require('express');
const router = new Router();
const controller = require('../controllers/todoController');

router.get('/lists', controller.getTodoLists);
router.post('/lists', controller.addTodoList);
router.delete('/lists', controller.deleteTodoList);
router.get('/lists/todo', controller.getTodosArray);
router.post('/lists/todo', controller.addTodoInArray);
router.put('/lists/todo', controller.updateTodoInArray);
router.delete('/lists/todo', controller.deleteTodoFromArray);


module.exports = router;