// Function to create HTML for a task item
const createTasksHtml = (id, name, description, assignedTo, dueDate, status) => {
  // Check if the task is already done
  const isTaskDone = status !== 'TODO' && status !== 'IN PROGRESS...'; 
  const isInProgress = status !== 'TODO';

  // Set the appropriate CSS class for the "Mark Done" button based on the task status
  const doneButtonClass = isTaskDone ? 'btn done-button d-none' : 'btn done-button';
  const inProgressButtonClass = isInProgress ? 'btn inProgress-button d-none' : 'btn inProgress-button';

  // Add the status class to the parent div based on the task status
  let statusClass = '';
  if (status === 'TODO') {
    statusClass = 'status-todo bg-info';
  } else if (status === 'DONE!') {
    statusClass = 'status-done bg-success';
  } else if (status === 'IN PROGRESS...') {
    statusClass = 'status-inProgress bg-warning';
  }

  return `
      <li class="list-group-item flex-grow-1 col-12 col-md-6 col-xl-4" data-task-id="${id}">
      <div class="card h-100 ${statusClass}">
        <div class="card ${statusClass}">
          <div class="card-body task-cards d-flex flex-column">
            <h4 class="card-title mb-4">${name}</h4>
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <p class="card-subtitle mb-3">${description}</p>
                <p class="card-subtitle mb-3"><strong>Assign To:</strong> ${assignedTo}</p>
                <p class="card-subtitle mb-3"><strong>Due Date:</strong> ${dueDate}</p>
              </div>
              
            </div>
            <div class="d-flex justify-content-center mt-2">
              <div class="${statusClass} status-bar"></div>
              <p class="mt-0 ms-2">${status}</p>
            </div>
            <div class="d-flex flex-column align-items-start">
              <div class="d-flex justify-content-between w-100">
                <button class="${inProgressButtonClass}">Pick Task</button>
                <button class="${doneButtonClass}">Mark Done</button>
                <button class="btn delete-button">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  `;
};

// Test if the createTasksHtml function works
const taskHtml = createTasksHtml('Get Gas', 'Go to the gas station and get gas', 'Me', '05/03/2023');
console.log(taskHtml);

// TaskManager class to manage tasks
class TaskManager {
  constructor(currentId = 0) {
    this._tasks = [];
    this._currentId = currentId;
  }
  
  // Add a new task to the task list
  addTask(name, description, assignedTo, dueDate, status = 'TODO') {
    const task = {
      id: this._currentId++,
      name,
      description,
      assignedTo,
      dueDate,
      status
    };
    this._tasks.push(task);
  }

  // Delete a task from the task list
  deleteTask(taskId) {
    const newTasks = [];
    for (let i = 0; i < this._tasks.length; i++) {
      const task = this._tasks[i];
      if (task.id !== taskId) {
        newTasks.push(task);
      }
    }
    this._tasks = newTasks;
  }

  // Render the task list on the page
  render() {
    const tasksHtmlList = [];
    this._tasks.forEach((task) => {
      // Format the due date of the task
      const date = new Date(task.dueDate);
      const month = date.toLocaleString('default', { month: 'short' });
      const day = date.getDate();
      const year = date.getFullYear();
      const formattedDate = `${month} ${day}, ${year}`;

      // Create the HTML for the task item
      const taskHtml = createTasksHtml(
        task.id,
        task.name,
        task.description,
        task.assignedTo,
        formattedDate,
        task.status
      );
      tasksHtmlList.push(taskHtml);
    });

    // Join the HTML for all task items
    const tasksHtml = tasksHtmlList.join('\n');

    // Get the task list element from the DOM
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = tasksHtml;
  }

  // Update the status of a task
  updateTaskStatus(taskId, status) {
    const task = this.getTaskById(taskId);
    if (task) {
      task.status = status;
      this.render();
    }
  }

  // Get a task by its ID
  getTaskById(taskId) {
    return this._tasks.find((task) => task.id === taskId) || null;
  }

  // Save the tasks to local storage
  save() {
    const tasksJson = JSON.stringify(this._tasks);
    localStorage.setItem('tasks', tasksJson);

    const currentId = String(this._currentId);
    localStorage.setItem('currentId', currentId); 
  }

  // Load the tasks from local storage
  load() {
    const tasksJson = localStorage.getItem('tasks');
    if (tasksJson) {
      this._tasks = JSON.parse(tasksJson);
    }

    const currentId = localStorage.getItem('currentId');
    if (currentId) {
      this._currentId = parseInt(currentId);
    }
  }
}

// Export the TaskManager class
export default TaskManager;