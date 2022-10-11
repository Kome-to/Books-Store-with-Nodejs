const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Book = new Schema({
    title: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 100
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
        type: Array,
        default: []
    },

    description: {
        type: String,
        required: true
    },
    amountSold: {
        type: Number,
        min: 0,
        default: 0
    },
    price: {
        type: Number,
        min: 0,
        default: 0
    }
}, { timestamps: true })

const Books = mongoose.model('Books', Book);

module.exports = Books;