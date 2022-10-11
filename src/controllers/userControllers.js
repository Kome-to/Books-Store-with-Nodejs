const Books = require('../models/books');


const getHomePage = async (req, res) => {
    const books = await Books.find({});
    let bestSeller = [], newRelease = [];
    if (books.length > 4) {
        newRelease = [books[books.length - 1], books[books.length - 2], books[books.length - 3], books[books.length - 4],];
        books.sort((a, b) => {
            if (a.amountSold > b.amountSold) return -1;
            else return 1;
        });
        bestSeller = [books[0], books[1], books[2], books[3],];
    } else {
        bestSeller = [...books];
        newRelease = [...books];
    }
    return res.render('homePage.ejs', { books, bestSeller, newRelease, user: req.user });
}

const getBooksPage = async (req, res) => {
    const books = await Books.find({});
    return res.render('booksPage.ejs', { books: books });
}

const searchBooks = async (req, res) => {
    const input = req.body.input.toLowerCase();
    let books = await Books.find({});
    books = books.filter(book => book.title.toLowerCase().indexOf(input) === 0);
    return res.status(200).json(books);
}

const getAboutPage = async (req, res) => {
    return res.render('aboutPage.ejs');
}

const getLoginPage = async (req, res) => {
    return res.render('loginPage.ejs');
}

const getRegisterPage = async (req, res) => {
    return res.render('registerPage.ejs');
}

const getDetailPage = async (req, res) => {
    const _id = req.params.id;
    const book = await Books.findById(_id);
    return res.render('detailPage.ejs', { book: book });
}

const getCartPage = async (req, res) => {
    try {
        let books = [], productAmount = [];
        if (req.cookies.cart) {
            const product = JSON.parse(req.cookies.cart);
            const productID = product.map(item => item.id);
            productAmount = product.map(item => item.amount);
            for (let e of productID) {
                const book = await Books.findById(e);
                books.push(book);
            }
        }
        const total = books.reduce((total, value, index) => {
            return total + value.price * productAmount[index];
        }, 0)
        return res.render('cartPage.ejs', { 'books': books, amounts: productAmount, total });
    } catch (err) {
        return res.json(400).json(err);
    }

}


module.exports = {
    getHomePage,
    getBooksPage,
    getAboutPage,
    getLoginPage,
    getRegisterPage,
    getDetailPage,
    getCartPage,
    searchBooks,
    // booksDetail
}