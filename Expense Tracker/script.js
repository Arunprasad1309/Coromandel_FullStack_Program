// The single source of truth for the application data
let expenseList = [];

// Fetching the Initial Data
function loadInitialData() {
  fetch('expenses.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response issues occurred while fetching data');
      }
      return response.json();
    })
    .then(data => {
      expenseList = data;
      // Kick off the initial layout build once data is in memory
      updateDashboard(expenseList);
    })
    .catch(error => {
      console.error('Failed to populate initial expense state:', error);
    });
}

// Start the sequence when the script runs
loadInitialData();

// Build the Render Engine
function renderTable(dataToRender) {
  const tableBody = document.getElementById('expenseTableBody');
  tableBody.innerHTML = ''; // Wipe old elements to avoid row duplications

  dataToRender.forEach(expense => {
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>${expense.title}</td>
      <td>${expense.category}</td>
      <td>₹${expense.amount}/-</td>
      <td>
        <button class="delete-btn" data-id="${expense.id}">Delete</button>
      </td>
    `;
    
    tableBody.appendChild(row);
  });
}

// Calculate Metrics with Array Reducers
function updateSummaryCards(dataToCalculate) {
  // 1. Total Expense via reduce
  const total = dataToCalculate.reduce((accumulator, item) => accumulator + item.amount, 0);

  // 2. Total Transactions count
  const count = dataToCalculate.length;

  // 3. Highest Expense via reduce
  const highest = dataToCalculate.reduce((max, item) => (item.amount > max ? item.amount : max), 0);

  // DOM Update
  document.getElementById('totalSpent').textContent = `₹${total}/-`;
  document.getElementById('totalTransactions').textContent = count;
  document.getElementById('highestExpense').textContent = `₹${highest}/-`;
}

// Implement Fixed Context Reporting
function logSystemStatus() {
  console.log(`[System Report] Monitoring ${this.listRef.length} standard records.`);
}

function triggerBoundDiagnostic(currentViewData) {
  // Create an explicit context reference target pointing to active screen dataset
  const contextTarget = { listRef: currentViewData };
  
  // Bind the function permanently to our specific target context
  const boundReporter = logSystemStatus.bind(contextTarget);
  
  // Execute the bound function context later
  boundReporter();
}

// Master coordinator orchestrating state visibility updates
function updateDashboard(targetData) {
  renderTable(targetData);
  updateSummaryCards(targetData);
  triggerBoundDiagnostic(targetData);
}

// Implement Category Filtering (ADDED BACK IN)
const filterDropdown = document.getElementById('filterCategory');

filterDropdown.addEventListener('change', (event) => {
  const selectedCategory = event.target.value;

  if (selectedCategory === 'All') {
    // Show everything if "All" is active
    updateDashboard(expenseList);
  } else {
    // Isolate records matching the specific filter criteria
    const filteredResults = expenseList.filter(expense => expense.category === selectedCategory);
    updateDashboard(filteredResults);
  }
});

// Implement the Add Expense Pipeline
const expenseForm = document.getElementById('expenseForm');

// Variadic execution container utilizing rest operator configurations
function addExpensesToState(...newItems) {
  expenseList = [...expenseList, ...newItems];
}

expenseForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Halt default browser navigation refresh loops

  // Safeguard: Stop execution if HTML5 verification metrics (like required placeholders) fail
  if (!expenseForm.checkValidity()) {
    expenseForm.reportValidity();
    return;
  }

  const titleInput = document.getElementById('titleInput');
  const amountInput = document.getElementById('amountInput');
  const categoryInput = document.getElementById('categoryInput');

  // Form structured operational payload wrapper object
  const newExpense = {
    id: Date.now(), // Generate semi-unique identifier timestamps
    title: titleInput.value,
    category: categoryInput.value,
    amount: parseFloat(amountInput.value)
  };

  // Pass payload parameters safely downstream via structural rest expansion handles
  addExpensesToState(newExpense);

  // Synchronize dashboard visualizations with updated context
  document.getElementById('filterCategory').value = 'All'; // Reset visual filters context
  updateDashboard(expenseList);

  // Clear operational input values safely
  expenseForm.reset();
});

// Implement Deletion Interactivity
const tableBodyContainer = document.getElementById('expenseTableBody');

tableBodyContainer.addEventListener('click', (event) => {
  // Use event delegation targeting valid class actions exclusively
  if (event.target.classList.contains('delete-btn')) {
    const targetId = parseInt(event.target.getAttribute('data-id'), 10);

    // Reassign core global scope values directly removing chosen element values
    expenseList = expenseList.filter(expense => expense.id !== targetId);

    // Refresh dynamic visualization layers explicitly honoring active filter state
    const currentFilter = document.getElementById('filterCategory').value;
    if (currentFilter === 'All') {
      updateDashboard(expenseList);
    } else {
      const remainingFiltered = expenseList.filter(exp => exp.category === currentFilter);
      updateDashboard(remainingFiltered);
    }
  }
});