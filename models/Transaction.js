// Import DataTypes from Sequelize to define the type of each model property
const { DataTypes } = require('sequelize');
// Import the sequelize instance configured to connect to our MySQL database
const sequelize = require('../database');

// Define the Transaction model to represent each budget transaction in our database
const Transaction = sequelize.define('Transaction', {
    // Unique identifier for each transaction
    id: {
        type: DataTypes.UUID,           // Use UUID for a unique identifier
        defaultValue: DataTypes.UUIDV4,   // Automatically generate a version 4 UUID
        primaryKey: true                // Mark as the primary key of the table
    },
    // Date the transaction occurred
    date: {
        type: DataTypes.DATEONLY,       // DATEONLY stores the date (no time)
        allowNull: false                // This field is required
    },
    // Category of the transaction (e.g., income, expense type)
    category: {
        type: DataTypes.STRING,         // Use a string to hold the category (e.g., "housing")
        allowNull: false                // Required field
    },
    // A brief description of the transaction
    description: {
        type: DataTypes.STRING,         // String type for description text
        allowNull: false                // Required field
    },
    // Monetary amount for the transaction
    amount: {
        type: DataTypes.FLOAT,          // Float to allow decimal values for money
        allowNull: false                // Required field
    }
},
{
    // Additional model options (if needed) can be specified here.
    // For example, you can set tableName, timestamps, etc.
});

// Export the Transaction model to be used in API routes (server.js)
module.exports = Transaction;