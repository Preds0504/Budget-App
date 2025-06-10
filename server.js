const express = require('express');//importing express
const { v4: uuidv4 } = require('uuid');  // For generating Unique ids for each transaction
const app = express();//instance of the app
const PORT = process.env.PORT || 3000;//Creates a port by env var or 3000 default

// Middleware to parse JSON bodies
app.use(express.json());
//Ensures all files are served properly
app.use(express.static('public'));

// In‑memory storage for transactions (simulate a database)
let transactions = [];

// GET route to fetch transactions
// Allows the client(front-end) to load requests
app.get('/api/transactions', (req, res) => {
    res.json(transactions);
});

// POST route to add a NEW transaction
app.post('/api/transactions', (req, res) => {
    const transaction = req.body;
    transaction.id = uuidv4();//Appends the ID to the object before storing
    // Optionally generate an id or validate input here
    transactions.push(transaction);
    res.status(201).json(transaction);
});

// DELETE route to remove a transaction (if needed)
app.delete('/api/transactions/:id', (req, res) => {
    const { id } = req.params;
    // Filter based on an id field (if your transaction objects include one)
    transactions = transactions.filter(tx => tx.id !== id);
    res.json({ message: 'Transaction removed' });
});

// DELETE route to remove ALL transactions
app.delete('/api/transactions', (req, res) => {
    transactions = [];
    res.json({ message: 'All transactions removed' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});