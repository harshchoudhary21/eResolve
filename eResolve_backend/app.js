const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require('dotenv').config({ path: '../.env' });

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173' // Allow only this origin to access the resources
  }));

// Middleware Imports
const errorMiddleware = require("./middleware/error")

// Route Imports
const userRoutes = require("./routes/userRoutes");

// Mount routes
app.use("/api/v1", userRoutes);

// Middleware for error
app.use(errorMiddleware)

module.exports = app;