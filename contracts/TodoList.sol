// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;

contract TodoList {
  uint public taskCount = 0;

  struct Task {
    uint id;
    string title;
    string description;
    bool completed;
  }

  mapping(uint => Task) public tasks;

  event TaskCreated(
    uint id,
    string title,
    string description,
    bool completed
  );

  event TaskCompleted(
    uint id,
    bool completed
  );

  constructor() public {
    createTask("First Task Title", "First Task Description");
  }

  function createTask(string memory _title, string memory _description) public {
    taskCount ++;
    tasks[taskCount] = Task(taskCount, _title, _description, false);
    emit TaskCreated(taskCount, _title, _description, false);
  }

  function toggleCompleted(uint _id) public {
    Task memory _task = tasks[_id];
    _task.completed = !_task.completed;
    tasks[_id] = _task;
    emit TaskCompleted(_id, _task.completed);
  }

}
