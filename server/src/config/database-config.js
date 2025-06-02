const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected...');
    } catch (err) {
        console.error('Database connection error: ' + err.message);
        process.exit(1); // exit on failure
    }
};

module.exports = connectDB;

