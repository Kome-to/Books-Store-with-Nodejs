const mongoose = require('mongoose');

require('dotenv').config()

const connectMongoDB = () => {
    try {
        // Connect to the MongoDB cluster
        mongoose.connect(
            process.env.DB_CONNECT,
            { useNewUrlParser: true, useUnifiedTopology: true },
            () => console.log(" Mongoose is connected")
        );

    } catch (e) {
        console.log("could not connect");
    }
}

module.exports = connectMongoDB;