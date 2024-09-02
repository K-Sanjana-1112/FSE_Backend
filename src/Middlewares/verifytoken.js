const jwt = require('jsonwebtoken')
require('dotenv').config()

function verifyToken(req, res, next) {
    // get token from req
    let bearertoken = req.headers.authorization;
    if (bearertoken) {
        let token = bearertoken.split(' ')[1]
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Invalid token' });
            }
            req.user = decoded;
            next()
        })
    } else {
        res.send({ message: "Unauthorized access" })
    }

}

function isAdmin(req, res, next) {
    if (req.user.role === 'admin') {
        return next();
    } else {
        return res.status(403).json({ error: 'Access denied. Admins only.' });
    }

}

module.exports = { verifyToken,isAdmin };
