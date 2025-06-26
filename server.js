// Import Express to create our API server
const express = require('express');
// Import uuid for unique ID generation (used in some cases or for compatibility)
const { v4: uuidv4 } = require('uuid');

// Create an instance of Express
const app = express();
// Set the port to an environment variable, or default to 3000
const PORT = process.env.PORT || 3000;

// Middleware: Parse incoming JSON data in requests
app.use(express.json());
// Middleware: Serve static files (like HTML, CSS, and JS) from the "public" folder
app.use(express.static('public'));

// Import our Sequelize connection from database.js
const sequelize = require('./database');
// Import the Transaction model to interact with our MySQL database
const Transaction = require('./models/Transaction');

// Sync the database:
// This creates the tables defined by our Sequelize models in the MySQL database.
// Remove 'force: true' in production to avoid dropping tables on every sync.
sequelize.sync().then(() => {
    console.log('Database Synced');
});

// ---------------------
// API Routes
// ---------------------

// GET route to fetch all transactions from the database
app.get('/api/transactions', async (req, res) => {
    try {
        // Retrieve all transactions using the Sequelize findAll() method
        const transactions = await Transaction.findAll();
        // Send the transactions as a JSON response
        res.json(transactions);
    } catch (err) {
        // Send an error response if something goes wrong
        res.status(500).json({ error: 'Error fetching transactions.' });
    }
});

// POST route to create a new transaction in the database
app.post('/api/transactions', async (req, res) => {
    try {
        // Destructure the transaction details from the request body
        const { date, category, description, amount } = req.body;
        // Create a new transaction entry in the database using Sequelize's create() method
        const transaction = await Transaction.create({ date, category, description, amount });
        // Return the new transaction with a 201 (Created) HTTP status code
        res.status(201).json(transaction);
    } catch (err) {
        res.status(500).json({ error: 'Error creating transaction.' });
    }
});

// DELETE route to remove a specific transaction by its unique ID
app.delete('/api/transactions/:id', async (req, res) => {
    try {
        // Get the transaction ID from the request parameters
        const { id } = req.params;
        // Use Sequelize's destroy() method to remove the transaction with the matching ID
        await Transaction.destroy({ where: { id } });
        // Return a success message upon deletion
        res.json({ message: 'Transaction removed' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting transaction.' });
    }
});

// DELETE route to remove all transactions from the database
app.delete('/api/transactions', async (req, res) => {
    try {
        // Sequelize's destroy() with an empty 'where' clause will delete all records
        await Transaction.destroy({ where: {} });
        res.json({ message: 'All transactions removed' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting transactions.' });
    }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});