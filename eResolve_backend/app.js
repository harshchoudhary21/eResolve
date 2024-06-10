const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser())

// Middleware Imports
const errorMiddleware = require("./middleware/error")

// Route Imports
const userRoutes = require("./routes/userRoutes");

// Mount routes
app.use("/api/v1", userRoutes);

// Middleware for error
app.use(errorMiddleware)

module.exports = app;