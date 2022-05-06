// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;

contract TodoList {
  uint public taskCount = 0;

  struct Task {
    uint id;
    address createdBy;
    string title;
    string description;
    bool completed;
  }

  mapping(uint => Task) public tasks;

  event TaskCreated(
    uint id,
    address createdBy,
    string title,
    string description,
    bool completed
  );

  event TaskCompleted(
    uint id,
    bool completed
  );

  function createTask(address _createdBy, string memory _title, string memory _description) public {
    taskCount ++;
    tasks[taskCount] = Task(taskCount, _createdBy, _title, _description, false);
    emit TaskCreated(taskCount, _createdBy, _title, _description, false);
  }

  function toggleCompleted(uint _id) public {
    Task memory _task = tasks[_id];
    _task.completed = !_task.completed;
    tasks[_id] = _task;
    emit TaskCompleted(_id, _task.completed);
  }

  function getTask(uint _id) public returns (uint, address, string memory, string memory, bool) {
    return (tasks[_id].id, tasks[_id].createdBy, tasks[_id].title, tasks[_id].description, tasks[_id].completed);
  }

}
