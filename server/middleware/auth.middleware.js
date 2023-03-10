const jwt = require("jsonwebtoken");
function authMiddleware(req, res, next) {

    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({message: 'Auth error'});
        }
        const decoded = jwt.verify(token, "RyanGosling");
        req.user = decoded;
        next();

    } catch (err) {
        return res.status(401).json({message: 'Auth error'})
    }
}

module.exports = authMiddleware;