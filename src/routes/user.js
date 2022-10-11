const router = require('express').Router();
const userControllers = require('../controllers/userControllers');
const authControllers = require('../controllers/authControllers');
const { verifyAccessToken } = require('../middleware/authentication');

const userRouter = (app) => {
    router.get('/', userControllers.getHomePage);
    router.get('/books', userControllers.getBooksPage);
    // router.post('/books/Detail', userControllers.booksDetail);
    router.post('/books/search', userControllers.searchBooks);
    router.get('/about', userControllers.getAboutPage);
    router.get('/login', userControllers.getLoginPage);
    router.get('/register', userControllers.getRegisterPage);
    router.get('/books/detail/:id', userControllers.getDetailPage);
    router.get('/user/cart', userControllers.getCartPage);

    //Authentication & Authorization    
    router.post('/user/register', authControllers.registerUser);
    router.put('/user/login', authControllers.loginUser)
    router.get('/user/load', verifyAccessToken, authControllers.loadUser);
    router.get('/user/logout', verifyAccessToken, authControllers.logoutUser);
    router.get('/user/refresh', authControllers.createNewToken)

    //User
    router.put('/user/updateCart', verifyAccessToken, authControllers.updateCart);
    router.put('/user/checkout', verifyAccessToken, authControllers.checkout);


    return app.use('/', router);
}

module.exports = userRouter;