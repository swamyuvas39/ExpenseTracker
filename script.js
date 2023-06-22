// Load expenses from local storage if available
document.addEventListener('DOMContentLoaded', function () {
    var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    renderExpenses(expenses);
  });
  
  // Submit form event listener
  document.getElementById('expenseForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var expenseCategory = document.getElementById('expenseCategory').value;
    var expenseDescription = document.getElementById('expenseDescription').value;
    var expenseAmount = document.getElementById('expenseAmount').value;
    
  
    // Create expense object
    var expense = {
      category: expenseCategory,
      description: expenseDescription,
      amount: expenseAmount
    };
  
    // Get expenses from local storage
    var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  
    // Add new expense
    expenses.push(expense);
  
    // Save expenses to local storage
    localStorage.setItem('expenses', JSON.stringify(expenses));
  
    // Render expenses
    renderExpenses(expenses);
  
    // Reset form fields
    document.getElementById('expenseForm').reset();
  });
  
  // Render expenses
  function renderExpenses(expenses) {
    var expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';
  
    // Loop through expenses and generate table rows
    for (var i = 0; i < expenses.length; i++) {
      var expense = expenses[i];
  
      var row = document.createElement('tr');
  
      var categoryColumn = document.createElement('td');
      categoryColumn.textContent = expense.category;
  
      var descriptionColumn = document.createElement('td');
      descriptionColumn.textContent = expense.description;

      var amountColumn = document.createElement('td');
      amountColumn.textContent = expense.amount;
  
      var actionsColumn = document.createElement('td');
  
      // Edit button
      var editButton = document.createElement('button');
      editButton.className = 'btn btn-sm btn-primary mr-2';
      editButton.textContent = 'Edit Expense';
      editButton.dataset.index = i;
      editButton.addEventListener('click', editExpense);
  
      // Delete button
      var deleteButton = document.createElement('button');
      deleteButton.className = 'btn btn-sm btn-danger';
      deleteButton.textContent = 'Delete Expense';
      deleteButton.dataset.index = i;
      deleteButton.addEventListener('click', deleteExpense);
  
      actionsColumn.appendChild(editButton);
      actionsColumn.appendChild(deleteButton);
  
      row.appendChild(categoryColumn);
      row.appendChild(descriptionColumn);
      row.appendChild(amountColumn);
      row.appendChild(actionsColumn);
  
      expenseList.appendChild(row);
    }
  }
  
  // Edit expense
  function editExpense(e) {
    var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    var index = e.target.dataset.index;
    var expense = expenses[index];
    var expenseCategory = prompt('Enter new expense category', expense.category);
    var expenseDescription = prompt('Enter new expense description', expense.description);
    var expenseAmount = prompt('Enter new expense amount', expense.amount);
  
    // Update expense values
    expense.category = expenseCategory;
    expense.description = expenseDescription;
    expense.amount = expenseAmount;
  
    // Save updated expenses to local storage
    localStorage.setItem('expenses', JSON.stringify(expenses));
  
    // Render expenses
    renderExpenses(expenses);
  }
  
  // Delete expense
  function deleteExpense(e) {
    var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    var index = e.target.dataset.index;
  
    // Remove expense from the array
    expenses.splice(index, 1);
  
    // Save updated expenses to local storage
    localStorage.setItem('expenses', JSON.stringify(expenses));
  
    // Render expenses
    renderExpenses(expenses);
  }
  