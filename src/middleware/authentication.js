const jwt = require('jsonwebtoken');
require('dotenv').config();
const Users = require('../models/users');


// Verify user
const verifyAccessToken = async (req, res, next) => {
    const accessToken = req.headers.token;
    jwt.verify(accessToken, process.env.SECRET_ACCESS_KEY, async (err, decoded) => {
        if (err) {
            return res.status(401).json('Invalid token');
        } else {
            try {
                const user = await Users.findById(decoded._id);
                // if (user && user.username === decoded.username)
                if (user) {
                    req.user = {
                        _id: user._id,
                        username: user.username,
                        fullName: user.fullName,
                        cart: user.cart,
                        email: user.email,
                        address: user.address,
                        orderSuccess: user.orderSuccess,
                        admin: user.admin
                    }
                    next();
                } else {
                    return res.status(403).json('You are not authorization');
                }
            } catch (err) {
                return res.status(500).json(err);
            }
        }
    });

}

// Verify admin
const verifyAdmin = async (req, res, next) => {
    verifyAccessToken(req, res, () => {
        if (req.user.admin) {
            next();
        } else {
            return res.status(403).json('No authorization');
        }
    })
}

module.exports = {
    verifyAccessToken,
    verifyAdmin
}