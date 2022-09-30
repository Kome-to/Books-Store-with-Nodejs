const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Book = new Schema({
    title: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 50
    },

    image: {
        type: String,
        requite: true
    },

    author: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 50
    },

    genres: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 50
    },

    description: {
        type: String,
        required: true
    }
})

const Books = mongoose.model('Books', Book);

module.exports = Books;