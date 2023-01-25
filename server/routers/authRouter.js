const Router = require('express');
const router = new Router();
const controller = require('../controllers/authController');
const {check} = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/registration', [
    check('email', "Incorrect email").isEmail(),
    check('password', "Incorrect password").isLength({min: 3, max: 12}),
], controller.registration);
router.post('/login', controller.login);

router.get('/auth', authMiddleware, controller.auth)
router.get('/users', controller.getUsers);

module.exports = router;