const bcrypt = require('bcryptjs');
const db = require('../database');
const jwt = require("jsonwebtoken");
const {validationResult} = require("express-validator");

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(404).json({error: 1, message: 'Incorrect request', errors});
            }

            const {email, login, password} = req.body;
            const users = await db.promise().query(`SELECT * FROM user WHERE email = '${email}'`);

            if (users[0].length) {
                return res.status(404).json({error: 1, message: `User with email ${email} already exist`});
            }

            const hashPassword = await bcrypt.hash(password, 8);
            await db.promise().query(`INSERT INTO user (email, login, password) VALUES ('${email}', '${login}', '${hashPassword}')`);
            return res.status(200).json({message: "User was created"});
        } catch (err) {
            res.json({
                error: 1,
                message: err
            });
        }
    }
    async login(req, res) {
        try {
            const {email, password} = req.body;
            const users = await db.promise().query(`SELECT * FROM user WHERE BINARY email = '${email}'`);

            if (!users[0].length) {
                return res.status(404).json({message: 'User not found'});
            }

            const isPassValid = bcrypt.compareSync(password, users[0][0].password);

            if (!isPassValid) {
                return res.status(400).json({message: 'Invalid entries information'});
            }

            const token = jwt.sign({id: users[0][0].id}, "RyanGosling", {expiresIn: "1h"});

            res.status(200).json({
                token,
                message: "Successful login",
                user: {
                    id: users[0][0].id,
                    email: users[0][0].email,
                    login: users[0][0].login
                }
            });

        } catch (err) {
            res.json({
                error: 1,
                message: err
            });
        }
    }
    async auth(req, res) {
        try {
            const {id} = req.user;
            const user = await db.promise().query(`SELECT * FROM user WHERE id=${id}`);

            const token = jwt.sign({id: id}, "RyanGosling", {expiresIn: "1h"});

            res.status(200).json({
                token,
                user: {
                    id: user[0][0].id,
                    email: user[0][0].email,
                    login: user[0][0].login
                }
            });
        } catch (err) {
            res.json({
                error: 1,
                message: err
            });
        }
    }
    async getUsers(req, res) {
        try {
            const response = await db.promise().query(`SELECT * FROM user`);
            res.send(response[0]);
            // res.json('server work');
        } catch (err) {

        }
    }
}

module.exports = new authController();