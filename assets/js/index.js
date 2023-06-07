// Import the TaskManager class from the taskManager.js file
import TaskManager from './taskManager.js';

// Create a new instance of TaskManager
const taskManager = new TaskManager();

// Get the tasksList element
const tasksList = document.getElementById('task-list');

// Event listener for the task-list
tasksList.addEventListener('click', (event) => {
  const target = event.target;

  // Handle "Mark As Done" button click
  if (target.classList.contains('done-button')) {
    const parentTask = target.closest('.list-group-item');
    const taskId = parseInt(parentTask.dataset.taskId);

    // Update the task status to "Done" in the taskManager
    taskManager.updateTaskStatus(taskId, 'DONE!');

    // Hide the "Mark Done" button
    const doneButton = parentTask.querySelector('.done-button');
    doneButton.classList.add('d-none');
  }

  // Handle "Delete" button click
  if (target.classList.contains('delete-button')) {
    const parentTask = target.closest('.list-group-item');
    const taskId = parseInt(parentTask.dataset.taskId);

    // Delete the task from the taskManager
    taskManager.deleteTask(taskId);

    // Save the updated tasks to localStorage
    taskManager.save();

    // Render the updated task list
    taskManager.render();
  }

  // Handle "In Progress" button click
  if (target.classList.contains('inProgress-button')) {
    const parentTask = target.closest('.list-group-item');
    const taskId = parseInt(parentTask.dataset.taskId);

    // Update the task status to "In Progress" in the taskManager
    taskManager.updateTaskStatus(taskId, 'IN PROGRESS...');

    // Hide the "In Progress" button
    target.classList.add('d-none');
  }

  // Save the updated tasks to localStorage
  taskManager.save();

  // Render the updated task list
  taskManager.render();
});

// Function to validate and handle form submission
const validFormFieldInput = (event) => {
  event.preventDefault(); // Prevent form submission

  // Get the input values from the form fields
  const taskNameInput = document.querySelector('#taskNameInput');
  const taskName = taskNameInput.value;

  const descriptionInput = document.querySelector('#descriptionInput');
  const description = descriptionInput.value;

  const assignInput = document.querySelector('#assignInput');
  const assignTo = assignInput.value;

  const datePickerInput = document.querySelector('#datePickerInput');
  const dueDate = datePickerInput.value;

  // Hide all error alerts initially
  const errorAlerts = document.querySelectorAll('.error-alert');
  errorAlerts.forEach(alert => {
    alert.classList.add('d-none');
  });

  // Check if any field is empty
  if (taskName === '') {
    // Show error alert for task name
    const taskNameErrorAlert = document.querySelector('#taskNameErrorAlert');
    taskNameErrorAlert.classList.remove('d-none');
  }

  if (description === '') {
    // Show error alert for description
    const descriptionErrorAlert = document.querySelector('#descriptionErrorAlert');
    descriptionErrorAlert.classList.remove('d-none');
  }

  if (assignTo === '') {
    // Show error alert for assign to
    const assignToErrorAlert = document.querySelector('#assignToErrorAlert');
    assignToErrorAlert.classList.remove('d-none');
  }

  if (dueDate === '') {
    // Show error alert for due date
    const dueDateErrorAlert = document.querySelector('#dueDateErrorAlert');
    dueDateErrorAlert.classList.remove('d-none');
  }

  // Check if all fields are filled
  if (taskName !== '' && description !== '' && assignTo !== '' && dueDate !== '') {
    console.log(`Task Name: ${taskName}`);
    console.log(`Description: ${description}`);
    console.log(`Assign To: ${assignTo}`);
    console.log(`Due Date: ${dueDate}`);

    // Add the task to the taskManager
    taskManager.addTask(taskName, description, assignTo, dueDate);

    // Render the updated task list
    taskManager.render();

    // Save the updated tasks to localStorage
    taskManager.save();

    // Reset the form fields
    taskForm.reset();

    // Log the details of the new task
    console.log('New Task:', taskManager._tasks[taskManager._tasks.length - 1]);
  }
};

// Get the task form element
const taskForm = document.querySelector('#taskForm');

// Add event listener to the form's submit event
taskForm.addEventListener('submit', validFormFieldInput);

// Load the tasks from localStorage
taskManager.load();

// Save the added tasks to localStorage
taskManager.save();

// Call render method to display the tasks
taskManager.render();

// Log the tasks in the taskManager (for testing purposes)
console.log(taskManager._tasks);
