// Require packages and set the port
import dotenv from 'dotenv';
import express from 'express';

import web from './routes/web.js';
// import api from './routes/api.js';
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import auth from './middleware/authentication.js';

import bodyParse from 'body-parser';
import mongoose from 'mongoose';
dotenv.config();
var app = express();
const { json, urlencoded } = bodyParse;
let port = process.env.PORT || 3002;

// Use Node.js body parsing middleware
app.use(json());
app.use(urlencoded({
    extended: true,
}));

// Check connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT)
        console.log('MongoDB connected!!')
    } catch (err) {
        console.log('Failed to connect to MongoDB!! ', err)
    }
}
connectDB()

// index route
app.use('/api/auth', authRouter);
app.use('/api/users', auth, userRouter);
app.use('/', web);

app.listen(port);
console.log(`Server is listening on port ${port}`);