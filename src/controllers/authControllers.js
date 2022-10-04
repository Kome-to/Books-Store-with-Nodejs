const Users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generalAccessToken = (data) => {
    const token = jwt.sign({
        username: data.username,
        _id: data._id,
    }, process.env.SECRET_ACCESS_KEY, { expiresIn: '1h' });
    return token;
}

const generalRefreshToken = (data) => {
    const token = jwt.sign({
        username: data.username,
        _id: data._id,
    }, process.env.SECRET_REFRESH_KEY, { expiresIn: '7d' });
    return token;
}

const registerUser = async (req, res) => {
    try {
        const data = req.body.user;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(data.password, salt);
        const user = new Users({
            'username': data.username,
            'fullName': data.fullName,
            'address': data.address,
            'email': data.email,
            'password': hash,
        })
        await user.save();
        return res.status(200).json({ user });
    } catch (err) {
        return res.status(400).json(err);
    }
}


const loginUser = async (req, res) => {
    try {
        const data = req.body.user;
        if (data.username) {
            const user = await Users.findOne({ username: data.username });
            if (Object.keys(user).length > 0) {
                const match = await bcrypt.compare(data.password, user.password);
                if (match) {
                    const accessToken = generalAccessToken(user);
                    const refreshToken = generalRefreshToken(user);
                    res.cookie('refreshToken', refreshToken, {
                        httpOnly: true,
                        path: '/',
                        secure: false, //set true when deploy
                        sameSite: 'strict'
                    });
                    await Users.findOneAndUpdate({ username: user.username }, { refreshToken: refreshToken });
                    return res.status(200).json({ accessToken: accessToken });
                } else {
                    return res.status(404).json('Wrong password');
                }
            } else {
                return res.status(404).json('Wrong username');
            }
        } else {
            return res.status(401).json('You are not authentication');
        }
    } catch (err) {
        return res.status(400).json(err);
    }
}

module.exports = {
    registerUser,
    loginUser
}