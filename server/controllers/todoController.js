const db = require('../database');

class todoController {
    async getTodoLists(req, res) {
        try {
            const {id} = req.user;
            const response = await db.promise().query(`SELECT * FROM todo_list WHERE user_id=${id}`);
            res.status(200).json(response[0]);
        } catch (err) {
            console.log(err);
        }
    }

    async addTodoList(req, res) {
        try {
            const {title} = req.body;
            const {id} = req.user;
            await db.promise().query(`INSERT INTO todo_list (user_id, title) VALUES (${id}, '${title}')`);
            res.status(200).json({message: 'a todoList was successful created'});
        } catch (err) {
            console.log(err);
        }
    }

    async deleteTodoList(req, res) {
        try {
            const {todoListId} = req.query;
            const {id} = req.user;
            await db.promise().query(`DELETE FROM todo_list WHERE id=${todoListId} AND user_id=${id}`);
            await db.promise().query(`DELETE FROM todo WHERE todo_list_id=${todoListId}`);
            res.status(200).json({message: 'todoList was deleted'});
        } catch (err) {
            res.json({
                error: 1,
                message: 'TodoList was not deleted. Check if there are tasks in your list'
            });
        }
    }

    async getTodosArray(req, res) {
        try {
            const {id} = req.query;
            const response = await db.promise().query(`SELECT * FROM todo WHERE todo_list_id=${id}`);
            res.status(200).json(response[0]);
        } catch (err) {
            console.log(err);
        }
    }

    async addTodoInArray(req, res) {
        try {
            const {value, id} = req.body;
            await db.promise().query(`INSERT INTO todo (value, todo_list_id, completed) VALUES ('${value}', ${id}, false)`);
            res.status(200).json({message: "Todo was added"})
        } catch (err) {
            console.log(err);
        }
    }
    async updateTodoInArray(req, res) {
        const {todo_id, value, completed = false} = req.body;
        await db.promise().query(`UPDATE todo SET value='${value}', completed=${completed} WHERE id=${todo_id}`);
        res.status(200).json({message: 'Todo was changed'});
    }
    async deleteTodoFromArray(req, res) {
        try {
            const {id, todoListId} = req.query;
            await db.promise().query(`DELETE FROM todo WHERE todo_list_id=${todoListId} AND id=${id}`);
            res.status(200).json({message: "Todo was deleted"})
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new todoController();