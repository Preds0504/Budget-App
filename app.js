const transactionForm = document.getElementById('transactionForm');
const clearBtn = document.getElementById('clearBtn');

let incomeTotal = parseFloat(localStorage.getItem('incomeTotal')) || 0;
let expenseTotal = parseFloat(localStorage.getItem('expenseTotal')) || 0;
let balance = parseFloat(localStorage.getItem('balance')) || 0;
let housingTotal   = parseFloat(localStorage.getItem('housingTotal'))     || 0;
let groceriesGasTotal   = parseFloat(localStorage.getItem('groceriesGasTotal')) || 0;
let entertainmentTotal  = parseFloat(localStorage.getItem('entertainmentTotal')) || 0;
let eatingOutTotal     = parseFloat(localStorage.getItem('eatingOutTotal'))  || 0;
let medicalTotal    = parseFloat(localStorage.getItem('medicalTotal'))  || 0;
let utilitiesTotal     = parseFloat(localStorage.getItem('utilitiesTotal'))  || 0;
let miscellaneousTotal  = parseFloat(localStorage.getItem('miscellaneousTotal')) || 0;
// This function calculates the total expenses and balance, then updates their displays.
function updateCalculations() {
    // Sum all expense-related totals
    expenseTotal = housingTotal + groceriesGasTotal + entertainmentTotal + eatingOutTotal + medicalTotal + utilitiesTotal + miscellaneousTotal;
    
    // Calculate balance (income minus total expenses)
    balance = incomeTotal - expenseTotal;
    
    // Update the display for income, expenses, and balance
    document.getElementById('incomeDisplay').textContent = 'Total Income: $' + incomeTotal;
    // If you have a dedicated expense element on your page, you can update it too:
    document.getElementById('expenseDisplay').textContent = 'Total Expenses: $' + expenseTotal;
    document.getElementById('balanceDisplay').textContent = 'Balance: $' + balance;
}
function getTransactionFromForm() {
    return {
        date: document.getElementById('transactionDate').value,
        category: document.getElementById('transactionCategory').value,
        description: document.getElementById('transactionDescription').value,
        amount: parseFloat(document.getElementById('transactionAmount').value)
    };
}
//Event listener for the income submission
transactionForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const transaction = getTransactionFromForm();
    addTransactionhistory(transaction);
    if (isNaN(transaction.amount)) {
        return;
    }
    switch (transaction.category) {
        case 'income':
            incomeTotal += transaction.amount;
            localStorage.setItem('incomeTotal', incomeTotal);
            document.getElementById('income').textContent = 'Income: $' + incomeTotal;
            break;
        case 'housing':
            housingTotal += transaction.amount;
            localStorage.setItem('housingTotal', housingTotal);
            document.getElementById('housing').textContent = 'Housing: $' + housingTotal;
            break;
        case 'groceriesGas':
            groceriesGasTotal += transaction.amount;
            localStorage.setItem('groceriesGasTotal', groceriesGasTotal);
            document.getElementById('groceriesGas').textContent = 'Grocery/Gas: $' + groceriesGasTotal;
            break;
        case 'entertainment':
            entertainmentTotal += transaction.amount;
            localStorage.setItem('entertainmentTotal', entertainmentTotal);
            document.getElementById('entertainment').textContent = 'Entertainment: $' + entertainmentTotal;
            break;
        case 'eatingOut':
            eatingOutTotal += transaction.amount;
            localStorage.setItem('eatingOutTotal', eatingOutTotal);
            document.getElementById('eatingOut').textContent = 'Eating Out: $' + eatingOutTotal;
            break;
        case 'medical':
            medicalTotal += transaction.amount;
            localStorage.setItem('medicalTotal', medicalTotal);
            document.getElementById('medical').textContent = 'Medical: $' + medicalTotal;
            break;
        case 'utilities':
            utilitiesTotal += transaction.amount;
            localStorage.setItem('utilitiesTotal', utilitiesTotal);
            document.getElementById('utilities').textContent = 'Utilities: $' + utilitiesTotal;
            break;
        case 'miscellaneous':
            miscellaneousTotal += transaction.amount;
            localStorage.setItem('miscellaneousTotal', miscellaneousTotal);
            document.getElementById('miscellaneous').textContent = 'Miscellaneous: $' + miscellaneousTotal;
            break;
        default:
            console.log("No valid category selected.");
    }
    updateCalculations();
    // After processing, clear the form fields:
    transactionForm.reset();
});
// Example clear button event listener to reset all totals
clearBtn.addEventListener('click', function(e) {
    e.preventDefault();
    // Reset all totals to 0
    incomeTotal = 0;
    expenseTotal = 0;
    balance = 0;
    housingTotal = 0;
    groceriesGasTotal = 0;
    entertainmentTotal = 0;
    eatingOutTotal = 0;
    medicalTotal = 0;
    utilitiesTotal = 0;
    miscellaneousTotal = 0;
    // Update localStorage with the reset values
     // Update localStorage for each total
     localStorage.setItem('incomeTotal', incomeTotal);
     localStorage.setItem('expenseTotal', expenseTotal);
     localStorage.setItem('balance', balance);
     localStorage.setItem('housingTotal', housingTotal);
     localStorage.setItem('groceriesGasTotal', groceriesGasTotal);
     localStorage.setItem('entertainmentTotal', entertainmentTotal);
     localStorage.setItem('eatingOutTotal', eatingOutTotal);
     localStorage.setItem('medicalTotal', medicalTotal);
     localStorage.setItem('utilitiesTotal', utilitiesTotal);
     localStorage.setItem('miscellaneousTotal', miscellaneousTotal);
    
    // Reset all display elements to show $0 totals
    document.getElementById('income').textContent = 'Income: $0';
    document.getElementById('housing').textContent = 'Housing: $0';
    document.getElementById('groceriesGas').textContent = 'Grocery/Gas: $0';
    document.getElementById('entertainment').textContent = 'Entertainment: $0';
    document.getElementById('eatingOut').textContent = 'Eating Out: $0';
    document.getElementById('medical').textContent = 'Medical: $0';
    document.getElementById('utilities').textContent = 'Utilities: $0';
    document.getElementById('miscellaneous').textContent = 'Miscellaneous: $0';   
    // If you have separate display elements for total expenses and balance, update those as well:
    document.getElementById('expenseDisplay').textContent = 'Total Expenses: $0';
    document.getElementById('incomeDisplay').textContent = 'Total Income: $0';
    document.getElementById('balanceDisplay').textContent = 'Balance: $0';
});

function addTransactionhistory(transaction) {

}
//TODO With this history Ill need to undo transaction history and recalculate values

    

