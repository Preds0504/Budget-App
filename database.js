// Import Sequelize constructor from the sequelize package
const { Sequelize } = require('sequelize');

// Import our database configuration from config/config.json for the 'development' environment
const config = require('./config/config.json').development;

// Create a new Sequelize instance using our configuration settings.
// This establishes a connection to the MySQL database.
const sequelize = new Sequelize(
  config.database,   // Database name (e.g., "budget_app")
  config.username,   // Username for accessing the database
  config.password,   // Password for the database user
  {
    host: config.host,      // Host (usually "127.0.0.1" for local development)
    dialect: config.dialect // "mysql" because we are using MySQL
    // Additional options can be added here if needed
  }
);

// Export the Sequelize instance so it can be used in other files (e.g., for defining models)
module.exports = sequelize;