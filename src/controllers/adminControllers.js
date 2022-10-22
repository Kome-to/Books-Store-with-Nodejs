
const Books = require('../models/books');
const Users = require('../models/users');

const getAdminPage = async (req, res) => {
    return res.render('adminPage.ejs');
}

const checkAdmin = async (req, res) => {
    return res.status(200).json({ admin: req.user });
}

const getAllBooks = async (req, res) => {
    try {
        const books = await Books.find({});
        return res.status(200).json({ books });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

const updateBook = async (req, res) => {
    try {
        const book = req.body.book;
        await Books.findByIdAndUpdate(book._id, {
            title: book.title,
            author: book.author,
            image: book.image,
            genres: [...book.genres],
            description: book.description,
            price: book.price.split('$')[0]
        });

        return res.status(200).json(book);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

const addBook = async (req, res) => {
    try {
        const book = req.body.book;
        const newBook = await Books({
            title: book.title,
            author: book.author,
            image: book.image,
            genres: [...book.genres],
            description: book.description,
            price: book.price.split('$')[0]
        });
        await newBook.save();
        return res.status(200).json(book);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

const detailBook = async (req, res) => {
    try {
        const _id = req.body.id;
        const book = await Books.findById(_id);
        return res.status(200).json(book);
    } catch {
        console.log(err);
        return res.status(500).json(err);
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await Users.find({});
        return res.status(200).json({ users });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

const detailUser = async (req, res) => {
    try {
        const _id = req.body.id;
        const user = await Users.findById(_id);
        return res.status(200).json(user);
    } catch {
        console.log(err);
        return res.status(500).json(err);
    }
}

// const updateUser = async (req, res) => {
//     try {
//         // const book = req.body.book;

//         // await Books.findByIdAndUpdate(book._id, {
//         //     title: book.title,
//         //     author: book.author,
//         //     image: book.image,
//         //     genres: [...book.genres],
//         //     description: book.description,
//         //     price: book.price.split('$')[0]
//         // });

//         // return res.status(200).json(book);
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json(err);
//     }
// }

const addUser = async (req, res) => {
    try {
        const user = req.body.user;
        const newUser = await Users({
            username: user.username,
            address: user.address,
            fullName: user.fullName,
            email: user.email
        });
        await newUser.save();
        return res.status(200).json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

const deleteBook = async (req, res) => {
    try {
        const _id = req.body._id;
        await Books.findByIdAndDelete(_id);
        return res.status(200).json(_id);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

const deleteUser = async (req, res) => {
    try {
        const _id = req.body._id;
        await Users.findByIdAndDelete(_id);
        return res.status(200).json(_id);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

module.exports = {
    getAdminPage,
    checkAdmin,
    getAllBooks,
    updateBook,
    detailBook,
    addBook,
    getAllUsers,
    // updateUser,
    detailUser,
    addUser,
    deleteUser,
    deleteBook
}