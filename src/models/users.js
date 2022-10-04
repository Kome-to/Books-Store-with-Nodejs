const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    username: {
        type: String,
        unique: true,
        minLength: 6,
        maxLength: 20,
        required: true
    },
    fullName: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 40
    },
    address: {
        type: String,
        require: true,
        minLength: 6,
        maxLength: 200
    },
    email: {
        type: String,
        require: true,
        minLength: 6,
        maxLength: 20,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    admin: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String
    }
})

const Users = mongoose.model('Users', User);

module.exports = Users;