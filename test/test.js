const { expect } = require('chai');

const assert = require('assert');
const TaskManager = require('./taskManagerTest.js');

describe('TaskManager', () => {
  let taskManager;

  beforeEach(() => {
    taskManager = new TaskManager();
  });

  describe('addTask', () => {
    it('should add a new task to the task list', () => {
      // Add a new task
      taskManager.addTask('Task 1', 'Description 1', 'Assignee 1', '2023-06-01');

      // Check if the task is added to the task list
      assert.strictEqual(taskManager._tasks.length, 1);

      // Check if the task properties are set correctly
      const addedTask = taskManager._tasks[0];
      assert.strictEqual(addedTask.name, 'Task 1');
      assert.strictEqual(addedTask.description, 'Description 1');
      assert.strictEqual(addedTask.assignedTo, 'Assignee 1');
      assert.strictEqual(addedTask.dueDate, '2023-06-01');
      assert.strictEqual(addedTask.status, 'TODO');
    });
  });

  describe('deleteTask', () => {
    it('should delete the specified task from the task list', () => {
      // Add tasks to the task list
      taskManager.addTask('Task 1', 'Description 1', 'Assignee 1', '2023-06-01');
      taskManager.addTask('Task 2', 'Description 2', 'Assignee 2', '2023-06-02');
      taskManager.addTask('Task 3', 'Description 3', 'Assignee 3', '2023-06-03');

      // Delete a task
      taskManager.deleteTask(2);

      // Check if the task is deleted from the task list
      assert.strictEqual(taskManager._tasks.length, 2);
      assert.strictEqual(taskManager._tasks.find((task) => task.id === 2), undefined);
    });
  });

  describe('getTaskById', () => {
    it('should return the task with the specified ID', () => {
      const taskManager = new TaskManager();
      taskManager.addTask('Task 1', 'Description 1', 'Assignee 1', '2023-06-30');
      taskManager.addTask('Task 2', 'Description 2', 'Assignee 2', '2023-07-31');
      taskManager.addTask('Task 3', 'Description 3', 'Assignee 3', '2023-08-31');
      
      const taskId = 2;
      const expectedTask = {
        id: taskId,
        name: 'Task 2',
        description: 'Description 2',
        assignedTo: 'Assignee 2',
        dueDate: '2023-07-31',
        status: 'TODO'
      };
    });
  

    it('should return null if the task with the specified ID is not found', () => {
      // Add tasks to the task list
      taskManager.addTask('Task 1', 'Description 1', 'Assignee 1', '2023-06-01');
      taskManager.addTask('Task 2', 'Description 2', 'Assignee 2', '2023-06-02');
      taskManager.addTask('Task 3', 'Description 3', 'Assignee 3', '2023-06-03');

      // Get a task by ID that doesn't exist
      const task = taskManager.getTaskById(4);

      // Check if null is returned
      assert.strictEqual(task, null);
    });
  });

  describe('constructor', () => {
    it('should initialize the TaskManager with an empty task list and current ID', () => {
      // Check if the task list is empty
      assert.strictEqual(taskManager._tasks.length, 0);

      // Check if the current ID is initialized to 0
      assert.strictEqual(taskManager._currentId, 0);
    });

    it('should initialize the TaskManager with the specified current ID', () => {
      // Create a new TaskManager with a specific current ID
      taskManager = new TaskManager(5);

      // Check if the current ID is set correctly
      assert.strictEqual(taskManager._currentId, 5);
    });
  });
});

