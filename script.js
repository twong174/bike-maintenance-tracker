let totalTasks = 0;
let upcomingTasks = 0;
let lastMaintenanceDate = null;
let totalCosts = 0;

document.getElementById('maintenance-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const task = document.getElementById('task').value;
    const date = new Date(document.getElementById('date').value);
    const interval = parseInt(document.getElementById('interval').value);
    const cost = parseFloat(document.getElementById('cost').value);
    const notes = document.getElementById('notes').value;

    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>Task:</strong> ${task} <br> <strong>Date:</strong> ${date.toDateString()} <br> <strong>Cost:</strong> $${cost.toFixed(2)} <br> <strong>Notes:</strong> ${notes} <br> <strong>Interval:</strong> Every ${interval} days`;

    document.getElementById('maintenance-list').appendChild(listItem);
    
    totalTasks++;
    totalCosts += cost;
    updateDashboard(date, interval);
    
    // Clear form fields
    document.getElementById('maintenance-form').reset();
});

document.getElementById('part-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const partName = document.getElementById('part-name').value;
    const condition = document.getElementById('condition').value;
    const replacementDate = document.getElementById('replacement-date').value;

    const partItem = document.createElement('li');
    partItem.innerHTML = `<strong>Part:</strong> ${partName} <br> <strong>Condition:</strong> ${condition} <br> <strong>Replacement Date:</strong> ${replacementDate}`;

    document.getElementById('parts-list').appendChild(partItem);
    
    // Clear form fields
    document.getElementById('part-form').reset();
});

function updateDashboard(date, interval) {
    const today = new Date();
    if (!lastMaintenanceDate || date > lastMaintenanceDate) {
        lastMaintenanceDate = date;
    }
    
    // Calculate upcoming tasks
    const nextMaintenanceDate = new Date(date);
    nextMaintenanceDate.setDate(date.getDate() + interval);
    
    if (nextMaintenanceDate > today) {
        upcomingTasks++;
    }

    document.getElementById('total-tasks').textContent = totalTasks;
    document.getElementById('total-costs').textContent = totalCosts.toFixed(2);
    document.getElementById('upcoming-tasks').textContent = upcomingTasks;
    document.getElementById('last-maintenance').textContent = lastMaintenanceDate ? lastMaintenanceDate.toDateString() : 'N/A';
}
