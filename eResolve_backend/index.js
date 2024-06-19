const app = require('./app');
const db = require('./config/database');
require('dotenv').config({ path: '../.env' });
const http = require('http')

//Setting up config file
// dotenv.config();

//Connecting to database
db();

const server = http.createServer(app);
//Uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down due to uncaught exception');
    process.exit(1);
});

//Starting the server
server.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});

//Unhandled promise rejections
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to unhandled promise rejection');
    server.close(() => {
        process.exit(1);
    });
});
