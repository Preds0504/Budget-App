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
// Global variable to store the current pie chart instance
let expensePieChart;
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
            renderExpensePieChart(transactions); // Render the chart after loading transactions
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



/**
 * Renders a pie chart using Chart.js to display the percentage distribution
 * of expense transactions by category.
 * @param {Array} transactions - An array of all transaction objects.
 */
function renderExpensePieChart(transactions) {
    // Filter the transactions to exclude those with a category of 'income'
    // so that we only visualize expenses.
    const expenseTransactions = transactions.filter(transaction => transaction.category !== 'income');

    // Aggregate the total expense amount for each expense category using reduce.
    // 'acc' is the accumulator object that will hold totals keyed by category.
    const totalsByCategory = expenseTransactions.reduce((acc, transaction) => {
        // Retrieve the category for the current expense transaction.
        const category = transaction.category;
        // If the category key doesn't exist in acc, initialize it to 0,
        // then add the current transaction's amount (converting it to a number).
        acc[category] = (acc[category] || 0) + parseFloat(transaction.amount);
        // Return the updated accumulator for use in the next iteration.
        return acc;
    }, {}); // Start with an empty object.

    // Extract the expense category names to use as labels for the pie chart.
    const labels = Object.keys(totalsByCategory);
    // Extract the corresponding total expense amounts to use as data values.
    const dataValues = Object.values(totalsByCategory);

    // Retrieve the <canvas> element from the DOM by its id 'transactionChart'
    // and get its 2D drawing context, which is required by Chart.js.
    const ctx = document.getElementById('transactionChart').getContext('2d');

    // If a pie chart instance already exists, destroy it to avoid duplicates.
    if (expensePieChart) {
        expensePieChart.destroy();
    }

    // Create a new Chart.js pie chart using the updated data.
    expensePieChart = new Chart(ctx, {
        type: 'pie', // Set the chart type to 'pie' to show a percentage distribution.
        data: {
            labels: labels, // Use the expense categories as the labels (slices).
            datasets: [{
                label: 'Expense Distribution', // Title for the dataset.
                data: dataValues, // The aggregated expense totals used for the pie slices.
                // Define background colors for each slice.
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',  // Color for the first category
                    'rgba(54, 162, 235, 0.5)',  // Color for the second category
                    'rgba(255, 206, 86, 0.5)',  // Color for the third category
                    'rgba(75, 192, 192, 0.5)',  
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                    'rgba(100, 200, 100, 0.5)',
                    'rgba(200, 100, 200, 0.5)'
                ],
                // Define border colors for each slice.
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(100, 200, 100, 1)',
                    'rgba(200, 100, 200, 1)'
                ],
                borderWidth: 1 // Set the border width for each pie slice.
            }]
        },
        options: {
            responsive: true, // Make the chart resize responsively.
            plugins: {
                // Additional configuration (e.g., tooltips, legends) can be added here.
            }
        }
    });
}

//TODO API+BACKEND(Node.js + Express)+GRAPH(Chart.js)+DATABASE(SQL)
//TODO Make it look nice and reasonable
//TODO Deplot to GitHub Pages
