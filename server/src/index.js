require('dotenv').config();
const app = require('./app/app');
const connectDB = require('./config/database-config');

// Connect to the database
connectDB();

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
});
