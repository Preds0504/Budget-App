# Budget-App

## Overview
Budget-App is a simple budgeting application that allows users to add, view, and delete transactions. It displays totals for various expense categories as well as overall income and balance. The application currently uses an Express.js API with an in-memory database, and serves a front-end built using HTML, CSS, and JavaScript. In a future phase, it can be extended with a persistent database and additional features like transaction graphs and user authentication.

## Features
- Add new transactions (income or expense)
- Display a list of transactions
- Calculate totals for income, each expense category, total expenses, and balance
- Delete individual transactions or clear all transactions
- API endpoints built with Node.js and Express

## Project Structure
budget-app/ ├── public/ │ ├── index.html # Main HTML file │ ├── app.js # Front-end JavaScript │ └── styles.css # CSS styles ├── server.js # Express API backend ├── package.json # Project metadata and dependencies └── README.md # Project documentation

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (includes npm)

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
Front-end: HTML, CSS, JavaScript
Back-end: Node.js, Express.js
Unique ID generation: uuid
### Future Enhancements
Integrate a persistent database for storing transactions.
Add user authentication.
Implement sorting and filtering of transactions.
Generate visual graphs for budgeting analytics.
### License
This project is licensed under the MIT License.

### Acknowledgments
Inspired by the need for a simple budgeting tool.
Built using tutorials on Express.js and modern JavaScript best practices.
