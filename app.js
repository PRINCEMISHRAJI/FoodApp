const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const { mongo, default: mongoose } = require('mongoose');
const cors = require('cors');
app.use(cors());
app.use(express.json()); //global middleware
app.use(express.static('public/build'))

const port = process.env.PORT || 5500;
app.listen(port, function(){
    console.log("Server has been started");
});

app.use(cookieParser());

//mini app
const userRouter = require("./Routers/userRouter");
const planRouter = require('./Routers/planRouter');
const reviewRouter = require('./Routers/reviewRouter');
const bookingRouter = require('./Routers/bookingRouter')
// const authRouter = require("./Routers/authRouter");

//base route , router to use
app.use('/users', userRouter);
app.use('/plans', planRouter);
app.use('/review', reviewRouter);
app.use('/booking', bookingRouter);
// app.use('/auth', authRouter);
