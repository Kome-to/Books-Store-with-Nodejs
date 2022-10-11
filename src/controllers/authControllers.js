const Users = require('../models/users');
const Books = require('../models/books');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generalAccessToken = (data) => {
    const token = jwt.sign({
        username: data.username,
        _id: data._id,
    }, process.env.SECRET_ACCESS_KEY, { expiresIn: '10s' });
    return token;
}

const generalRefreshToken = (data) => {
    const token = jwt.sign({
        username: data.username,
        _id: data._id,
    }, process.env.SECRET_REFRESH_KEY, { expiresIn: '7d' });
    return token;
}

const mergeCart = (anonymous = '[]', user = '[]') => {
    const anonymousCart = JSON.parse(anonymous);
    const userCart = JSON.parse(user);
    const arr = userCart.map(item => item.id);
    anonymousCart.forEach(element => {
        if (!arr.includes(element.id)) {
            userCart.push(element);
        }
    });
    return JSON.stringify(userCart);
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
            if (user) {
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
                    const newCart = mergeCart(req.cookies.cart, user.cart);
                    await Users.findOneAndUpdate({ username: user.username },
                        { refreshToken: refreshToken, cart: newCart });
                    return res.status(200).json({ accessToken: accessToken, cart: newCart });
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
        console.log(err);
        return res.status(400).json(err);
    }
}

const loadUser = (req, res) => {
    try {
        const user = req.user;
        return res.status(200).json({ user });
    } catch (err) {
        return res.status(500).json(err)
    }
}

const updateCart = async (req, res) => {
    try {
        await Users.findByIdAndUpdate(req.user._id, { cart: req.body.cart });
        return res.status(200).json({ cart: req.body.cart });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

const logoutUser = async (req, res) => {
    try {
        res.cookie('refreshToken', 'destroy', { expires: new Date(Date.now()), httpOnly: true });
        await Users.findByIdAndUpdate(req.user._id, { refreshToken: '' });
        return res.status(200).redirect('/');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

const createNewToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    jwt.verify(refreshToken, process.env.SECRET_REFRESH_KEY, async (err, decoded) => {
        if (err) {
            return res.status(401).json('Token invalid');
        } else {
            try {
                const user = await Users.findById(decoded._id);
                if (user && user._id == decoded._id) {
                    const newRefreshToken = generalRefreshToken(decoded);
                    const newAccessToken = generalAccessToken(decoded);
                    res.cookie('refreshToken', newRefreshToken, {
                        httpOnly: true,
                        path: '/',
                        secure: false, //set true when deploy
                        sameSite: 'strict'
                    });
                    await Users.updateOne({ _id: user._id }, { refreshToken: newRefreshToken });
                    return res.status(200).json({ accessToken: newAccessToken });
                } else {
                    return res.status(403).json('You are not authentication');
                }
            } catch (err) {
                return res.status(500).json(err);
            }
        }
    });
}

const checkout = async (req, res) => {
    try {
        const date = new Date();
        let cart = req.user.cart;
        const user = await Users.findById(req.user._id);
        user.orderSuccess.push({ 'order': cart, 'date': JSON.stringify(date) });
        user.cart = "[]";
        await user.save();
        cart = JSON.parse(cart);
        cart.forEach(async item => {
            const book = await Books.findById(item.id);
            book.amountSold += item.amount;
            await book.save();
        })
        console.log(cart);
        return res.status(200).json('ok');
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}
module.exports = {
    registerUser,
    loginUser,
    loadUser,
    updateCart,
    logoutUser,
    createNewToken,
    checkout
}