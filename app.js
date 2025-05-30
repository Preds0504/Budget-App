const incomeForm = document.getElementById('incomeForm');
const expenseForm = document.getElementById('expenseForm');
const clearBtn = document.getElementById('clearBtn');

let incomeTotal = parseFloat(localStorage.getItem('incomeTotal')) || 0;
let expenseTotal = parseFloat(localStorage.getItem('expenseTotal')) || 0;
let balance = parseFloat(localStorage.getItem('balance')) || 0;
/**
 * Updates the income total by adding the specified amount and saves it in localStorage.
 *
 * @param {number} amount - The amount to add to the income total.
 */
function updateIncomeTotal(amount) {
    incomeTotal += amount;
    localStorage.setItem('incomeTotal', incomeTotal);
    // perform additional calculations or UI updates...
    updateIncomeDisplay();
    updateBalance()
}
/**
 * updates the display of the total income
 */
function updateIncomeDisplay() {
    document.getElementById('incomeDisplay').textContent = 'Total Income: $' + incomeTotal;
}
/**
 * Updates the expense total by adding the specified amount and saves it in localStorage.
 *
 * @param {number} amount - The amount to add to the expense total.
 */
function updateExpenseTotal(amount) {
    expenseTotal += amount;
    localStorage.setItem('expenseTotal', expenseTotal);
    // perform additional calculations or UI updates...
    updateExpenseDisplay();
    updateBalance()
}
/**
 * updates the display of the total expense
 */
function updateExpenseDisplay() {
    document.getElementById('expenseDisplay').textContent = 'Total Income: $' + expenseTotal;
}
/**
 * updates the balance
 */
function updateBalance() {
    
    balance = incomeTotal - expenseTotal;
    localStorage.setItem('balance', balance);
    document.getElementById('balanceDisplay').textContent = 'Balance: $' + balance;
}
//Event listener for the income submission
incomeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Get the latest input value:
    const amount = parseFloat(document.getElementById('IncomeAmount').value);
    
    // Handle income submission and perform calculations...
    updateIncomeTotal(amount);
    
    // After processing, clear the form fields:
    incomeForm.reset();
});
//Event listener for the expense submission
expenseForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('ExpenseAmount').value);
    
    // Handle expense submission and perform calculations...
    updateExpenseTotal(amount);
    
    // After processing, clear the form fields:
    expenseForm.reset();
});
// Example clear button event listener to reset all totals
clearBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Reset all totals to 0
    incomeTotal = 0;
    expenseTotal = 0;
    balance = 0;
    
    // Update localStorage with the reset values
    localStorage.setItem('incomeTotal', incomeTotal);
    localStorage.setItem('expenseTotal', expenseTotal);
    localStorage.setItem('balance', balance);
    
    // Update the UI displays
    updateIncomeDisplay();
    updateExpenseDisplay();
    updateBalance();
});
