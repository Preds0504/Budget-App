const transactionForm = document.getElementById('transactionForm');
const clearBtn = document.getElementById('clearBtn');
// Initialize totals for transactions
let incomeTotal = 0;
let expenseTotal = 0;
let housingTotal = 0;
let groceriesGasTotal = 0;
let entertainmentTotal = 0;
let eatingOutTotal = 0;
let medicalTotal = 0;
let utilitiesTotal = 0;
let miscellaneousTotal = 0;
let balance = 0;
// The transactions array is populated by API calls.
let transactions = [];
/**
 * Notes for programmer:
 * When loadTransactions() is called, it makes an HTTP GET request to '/api/transactions'.
 * When the server responds, the response is parsed as JSON.
 * Once parsed, the data is stored in the transactions array.
 * Then, renderTransactionHistory() is called to update the transaction list on the page.
 * calculateTotals() is called to update income, expense, and balance displays.
 * If any error occurs along the way, it is caught and logged.
 */
function loadTransactions() {
    //Makes a HTTP request and the argument saying the endpoint of the server
    //Returns a promise that will eventually resolve to a response object
    fetch('/api/transactions')
        //When fetch resolves, will take in reponse.
        //thee response.json is a method that reads the response stream and 
        //parses it to JSON data.
        //Will return a promise
        .then(response => response.json())
        //It waits for the JSON data to be parsed.
        //The arrow function here accepts a parameter named data. 
        // This is the parsed JSON—hopefully, an array of transaction objects.
        .then(data => {
            transactions = data;
            renderTransactionHistory();
            calculateTotals();
        })
        .catch(error => console.error('Error loading transactions:', error));
}
/**
 * Will remove the transaction from given the id
 * @param id the id of the transaction to be deleted
 */
function deleteTransaction(id) {
    fetch(`/api/transactions/${id}`, {
       method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message); // Log confirmation
        // Reload transactions from API after deletion:
        loadTransactions();
    })
    .catch(error => console.error('Error deleting transaction:', error));
}
/**
 * Will update the total transactions with the new one
 * @param transaction The transaction to add from the form
 */
function addTransactionhistory(transaction) {
    fetch('/api/transactions', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(transaction)
    })
    .then(response => response.json())
    .then(data => {
        // Optionally push the newly added transaction into your array
        loadTransactions();
    })
    .catch(error => console.error('Error adding transaction:', error));
}
/**
 * Will calculate all the data help in the transaction objects
 * Then it will display all the new data
 */
function calculateTotals() {
    // Reset totals
    incomeTotal = expenseTotal = housingTotal = groceriesGasTotal = entertainmentTotal = eatingOutTotal = medicalTotal = utilitiesTotal = miscellaneousTotal = 0;
    // Calculate totals from all transactions
    transactions.forEach(transaction => {
      // You might adjust this based on how you structure your data
      if (transaction.category === 'income') {
          incomeTotal += transaction.amount;
      } else {
          // Assuming these are expenses:
          switch (transaction.category) {
            case 'housing':
              housingTotal += transaction.amount;
              break;
            case 'groceriesGas':
              groceriesGasTotal += transaction.amount;
              break;
            case 'entertainment':
              entertainmentTotal += transaction.amount;
              break;
            case 'eatingOut':
              eatingOutTotal += transaction.amount;
              break;
            case 'medical':
              medicalTotal += transaction.amount;
              break;
            case 'utilities':
              utilitiesTotal += transaction.amount;
              break;
            case 'miscellaneous':
              miscellaneousTotal += transaction.amount;
              break;
            default:
              break;
          }
          expenseTotal += transaction.amount;
      }
    });
  
    balance = incomeTotal - expenseTotal;
      // Update the display for income, expenses, and balance
      document.getElementById('incomeDisplay').textContent = 'Total Income: $' + incomeTotal;
      document.getElementById('expenseDisplay').textContent = 'Total Expenses: $' + expenseTotal;
      document.getElementById('balanceDisplay').textContent = 'Balance: $' + balance;
      // Update individual category displays
      document.getElementById('income').textContent = 'Income: $' + incomeTotal;
      document.getElementById('housing').textContent = 'Housing: $' + housingTotal;
      document.getElementById('groceriesGas').textContent = 'Grocery/Gas: $' + groceriesGasTotal;
      document.getElementById('entertainment').textContent = 'Entertainment: $' + entertainmentTotal;
      document.getElementById('eatingOut').textContent = 'Eating Out: $' + eatingOutTotal;
      document.getElementById('medical').textContent = 'Medical: $' + medicalTotal;
      document.getElementById('utilities').textContent = 'Utilities: $' + utilitiesTotal;
      document.getElementById('miscellaneous').textContent = 'Miscellaneous: $' + miscellaneousTotal;
}
/**
 * Will read in the transaction data submitted from the user
 * @returns transaction the object that holds all the transaction values
 */
function getTransactionFromForm() {
    return {
        date: document.getElementById('transactionDate').value,
        category: document.getElementById('transactionCategory').value,
        description: document.getElementById('transactionDescription').value,
        amount: parseFloat(document.getElementById('transactionAmount').value)
    };
}


/**
 * This will list all the transactions by modifying the DOM elements
 */
function renderTransactionHistory() {
    const transactionList = document.getElementById('transactionList'); 
    transactionList.innerHTML = ''; // Clear any previous content

    // Loop through every transaction in the transactions array
    transactions.forEach(transaction => {
        // Create a new list item element to display this transaction's details
        const li = document.createElement('li');
        li.textContent = `${transaction.date} | ${transaction.category} | ${transaction.description} | $${transaction.amount}`;

        // Create a Delete button for the transaction
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        // When this button is clicked, it will call deleteTransaction()
        // and pass the unique id of the current transaction
        deleteBtn.addEventListener('click', () => {
            deleteTransaction(transaction.id);
        });

        // Append the delete button to the list item
        li.appendChild(deleteBtn);
        // Append the list item to the transaction list in the DOM
        transactionList.appendChild(li);
    });
} 
// Example clear button event listener to reset all totals
clearBtn.addEventListener('click', function(e) {
    e.preventDefault();
    fetch('/api/transactions', {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
         console.log(data.message);  // Logs: "All transactions removed"
         // Reset your totals
         incomeTotal = expenseTotal = balance = housingTotal = groceriesGasTotal = entertainmentTotal = eatingOutTotal = medicalTotal = utilitiesTotal = miscellaneousTotal = 0;
         loadTransactions();
    })
    .catch(error => console.error('Error clearing transactions:', error));
});
//Event listener for the form submission
transactionForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const transaction = getTransactionFromForm();
    addTransactionhistory(transaction);
    // After processing, clear the form fields:
    transactionForm.reset();
});



document.addEventListener('DOMContentLoaded', function() {
    loadTransactions();
    renderTransactionHistory();
    calculateTotals();
});


//TODO API+BACKEND(Node.js + Express)+GRAPH(Chart.js)+DATABASE(SQL)
//TODO Transition some front-end to react or typescript(Maybe)
//TODO Make it look nice and reasonable
//TODO Deplot to GitHub Pages
