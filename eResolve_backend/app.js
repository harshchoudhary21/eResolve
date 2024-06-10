const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cookieParser());

//Import Middlewares
const errorMiddleware = require('./middleware/error');
//Import all routes
const userRoutes = require('./routes/userRoutes');
//Mounting the routes
app.use('/api/v1', userRoutes);

//Middleware to handle errors
app.use(errorMiddleware);
