const Books = require('../models/books');


const getHomePage = async (req, res) => {
    const books = await Books.find({});
    return res.render('homePage.ejs', { books: books });
}

const getBooksPage = async (req, res) => {
    const books = await Books.find({});
    return res.render('booksPage.ejs', { books: books });
}

const getAboutPage = async (req, res) => {
    return res.render('about.ejs');
}

const getLoginPage = async (req, res) => {
    return res.render('loginPage.ejs');
}

const getRegisterPage = async (req, res) => {
    return res.render('registerPage.ejs');
}

const getDetailPage = async (req, res) => {
    const _id = req.params.id;
    const book = await Books.findById(_id).exec();
    return res.render('detailPage.ejs', { book: book });
}

const getCartPage = async (req, res) => {
    const books = await Books.find({});
    return res.render('cartPage.ejs', { books: books });
}

module.exports = {
    getHomePage,
    getBooksPage,
    getAboutPage,
    getLoginPage,
    getRegisterPage,
    getDetailPage,
    getCartPage

}