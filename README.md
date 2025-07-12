# Budget-App

## Overview
Budget-App is a simple budgeting application that allows users to add, view, and delete transactions. It calculates totals for various expense categories as well as overall income and balance. The application features a Node.js/Express API with a MySQL database for persistent storage, and a basic front-end built with HTML, CSS, and JavaScript.

## Features
- Add new transactions (income or expense)
- Display a list of transactions with individual delete buttons
- Calculate totals for income, each expense category, and overall balance
- Delete individual transactions or clear all transactions
- API endpoints built using Node.js, Express, and Sequelize (with MySQL)
- Pie Chart to display expense distribution

## Project Structure
budget-app/ ├── public/ │ ├── index.html # Main HTML file │ ├── app.js # Front-end JavaScript │ └── styles.css # CSS styles ├── server.js # Express API backend ├── package.json # Project metadata and dependencies └── README.md # Project documentation

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (includes npm)
- [MySQL](https://www.mysql.com/) (Community Edition works fine)
- (Optional) [MySQL Workbench](https://www.mysql.com/products/workbench/) - A graphical tool for managing your MySQL databases.
- (Optional) [Postman](https://www.postman.com/downloads/) - For testing API endpoints.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/budget-app.git
2. Navigate to the project directory:
    cd budget-app
3. Install the dependencies
    npm install

### Running the application
1. Start the backend server
    node server.js
2. Open your browser and navigate to http://localhost3000 to use application
### API Endpoints
GET /api/transactions
Retrieves an array of all transactions.
POST /api/transactions
Adds a new transaction. The request body should be a JSON object containing date, category, description, and amount.
DELETE /api/transactions/:id
Removes a transaction by its unique ID.
DELETE /api/transactions
Removes all transactions.
### Technologies Used
Front-end: HTML, CSS, JavaScript, Chart.js (for visualizing expense distribution)
Back-end: Node.js, Express.js, Sequelize, MySQL
Development & Testing:
Unique ID generation: uuid
MySQL Workbench (optional): For visually managing the database
Postman (optional): For testing API endpoints manually
Chart.js Integration
Future Enhancements
Integrate a persistent database for storing transactions.
Add user authentication.
Implement sorting and filtering of transactions.
Generate additional visual graphs for enhanced budgeting analytics.
### License
This project is licensed under the MIT License.

### Acknowledgments
Inspired by the need for a simple budgeting tool, this project was built using tutorials on Express.js, Sequelize, MySQL, Chart.js, and modern JavaScript best practices.
