const express = require('express');
const viewEngine = require('./configs/viewEngine');
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');
const connectDB = require('./configs/connectDB');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 8080;

//Logger
app.use(morgan('dev'));

//Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

//Connect DataBase
connectDB();

//Use view engine 
viewEngine(app);

//Router Admin
adminRouter(app);

//Router User
userRouter(app);

//404 page
app.get('*', (req, res) => {
    return res.render('404page.ejs');
})

app.listen(port, () => {
    console.log(`Server is running on port ${port} `);
})