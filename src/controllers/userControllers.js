const Books = require('../models/books');
const Users = require('../models/users');


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
    try {
        const input = req.body.input.toLowerCase();
        let books = await Books.find({});
        books = books.filter(book => book.title.toLowerCase().indexOf(input) === 0);
        return res.status(200).json(books);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
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
    try {
        const _id = req.params.id;
        const book = await Books.findById(_id);
        const genres = book.genres;
        const relationBook = await Books.find({
            genres: {
                $in: [...genres]
            }
        });
        console.log(relationBook);
        return res.render('detailPage.ejs', { book, relationBook });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
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
        return res.status(400).json(err);
    }

}

const viewProfile = async (req, res) => {
    return res.render('profilePage.ejs');
}

const updateUser = async (req, res) => {
    try {
        const user = req.body.user;
        await Users.findByIdAndUpdate(user._id, {
            username: user.username,
            fullName: user.fullName,
            address: user.address,
            email: user.email
        });
        return res.status(200).json({ user });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

const getOrderInfo = async (req, res) => {
    try {
        const orders = req.body.order;
        for (let element of orders) {
            const products = JSON.parse(element.order);
            for (let product of products) {
                const book = await Books.findById(product.id);
                product.title = book.title;
                product.image = book.image;
            }
            element.order = products;
        }
        return res.status(200).json({ orderSuccess: orders });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

const searchByPrice = async (req, res) => {
    try {
        const prices = req.body.prices;
        const books = await Books.find({
            price: {
                $gte: prices[0],
                $lt: prices[1]
            }
        });
        return res.status(200).json(books);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

const searchByGenres = async (req, res) => {
    try {
        const genre = req.body.genre;
        const books = await Books.find({
            genres: genre
        });
        return res.status(200).json(books);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
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
    viewProfile,
    updateUser,
    getOrderInfo,
    searchByPrice,
    searchByGenres
}