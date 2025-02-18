// index.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS middleware
const inventoryRouter = require('./routes/inventories'); // Adjust the path as necessary
const connectDB = require('./config/db'); // Import the DB connection

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all origins (or customize as needed)
app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Connect to MongoDB
connectDB();

app.use('/uploads', express.static('uploads')); // Make the uploads folder publicly accessible


// Routes
app.use('/api/inventories', inventoryRouter);

// Start server
const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
