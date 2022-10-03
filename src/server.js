const express = require('express');
const viewEngine = require('./configs/viewEngine');
const userRouter = require('./routes/user');
const connectDB = require('./configs/connectDB');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//Connect DataBase
connectDB();

//Use view engine 
viewEngine(app);

//Router
userRouter(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port} `);
})