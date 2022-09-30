const router = require('express').Router();
const Books = require('../models/books');
const userControllers = require('../controllers/userControllers');

const userRouter = (app) => {
    router.get('/', userControllers.getHomePage);
    router.get('/books', userControllers.getBooksPage);
    router.get('/about', userControllers.getAboutPage);
    router.get('/login', userControllers.getLoginPage);
    router.get('/register', userControllers.getRegisterPage);
    router.get('/books/detail/:id', userControllers.getDetailPage);
    router.get('/user/cart', userControllers.getCartPage)
    return app.use('/', router);
}

module.exports = userRouter;