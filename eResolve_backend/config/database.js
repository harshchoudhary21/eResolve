require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');

const db = ()   => {
    mongoose.connect(process.env.MONGO_URL, ).then(() => {
        console.log('Database connected');
    }).catch((err) => {
        console.log('Database connection error', err);
    });
};
module.exports = db;
