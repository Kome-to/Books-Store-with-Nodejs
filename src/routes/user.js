const router = require('express').Router();
const userControllers = require('../controllers/userControllers');
const authControllers = require('../controllers/authControllers');
const { verifyAccessToken } = require('../middleware/authentication');

const userRouter = (app) => {

    // General
    router.get('/', userControllers.getHomePage);
    router.get('/books', userControllers.getBooksPage);
    router.post('/books/search', userControllers.searchBooks);
    router.post('/books/search-by-price', userControllers.searchByPrice);
    router.post('/books/search-by-genres', userControllers.searchByGenres);
    router.get('/about', userControllers.getAboutPage);
    router.get('/login', userControllers.getLoginPage);
    router.get('/register', userControllers.getRegisterPage);
    router.get('/books/detail/:id', userControllers.getDetailPage);
    router.get('/user/cart', userControllers.getCartPage);

    // Authentication
    router.post('/user/register', authControllers.registerUser);
    router.put('/user/login', authControllers.loginUser)
    router.get('/user/load', verifyAccessToken, authControllers.loadUser);
    router.get('/user/logout', verifyAccessToken, authControllers.logoutUser);
    router.get('/user/refresh', authControllers.createNewToken)

    // User
    router.put('/user/updateCart', verifyAccessToken, userControllers.updateCart);
    router.put('/user/checkout', verifyAccessToken, userControllers.checkout);
    router.get('/user/profile', userControllers.viewProfile);
    router.put('/user/update', verifyAccessToken, userControllers.updateUser);
    router.put('/user/order-success', verifyAccessToken, userControllers.getOrderInfo);


    return app.use('/', router);
}

module.exports = userRouter;