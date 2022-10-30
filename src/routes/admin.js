const router = require('express').Router();
const { verifyAdmin } = require('../middleware/authentication')
const adminControllers = require('../controllers/adminControllers');

const adminRouter = (app) => {
    router.get('/', adminControllers.getAdminPage);
    router.get('/check', verifyAdmin, adminControllers.checkAdmin);

    // Book management
    router.get('/books/all', verifyAdmin, adminControllers.getAllBooks);
    router.put('/books/update', verifyAdmin, adminControllers.updateBook);
    router.post('/books/add', verifyAdmin, adminControllers.addBook);
    router.put('/books/detail', verifyAdmin, adminControllers.detailBook);
    router.delete('/books/delete', verifyAdmin, adminControllers.deleteBook);

    // User management
    router.get('/users/all', verifyAdmin, adminControllers.getAllUsers);
    router.post('/users/add', verifyAdmin, adminControllers.addUser);
    router.put('/users/detail', verifyAdmin, adminControllers.detailUser);
    router.delete('/users/delete', verifyAdmin, adminControllers.deleteUser);

    return app.use('/admin', router);
}

module.exports = adminRouter;