pragma solidity >=0.4.21 <0.7.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/TodoList.sol";

contract TestTodoList {

  function testItCreatesATask() public {
    TodoList todoList = TodoList(DeployedAddresses.TodoList());

    //Create a task
    todoList.createTask(address(0), "Test Title", "Test Description");

    //The tasks expected values
    address expectedAddress = address(0);
    string memory expectedTitle = "Test Title";
    string memory expectedDescription = "Test Description";
    bool expectedCompleted = false;

    //Get the values of the created task
    (uint256 id, address createdBy, string memory title, string memory description, bool completed) = todoList.getTask(1);
  
    //Test that the values are correct
    Assert.equal(createdBy, expectedAddress, "It should have the address 0.");
    Assert.equal(title, expectedTitle, "It should have the title 'Test Title'.");
    Assert.equal(description, expectedDescription, "It should have the description 'Test Description'.");
    Assert.equal(completed, expectedCompleted, "It should not be completed");
  }

  function testItTogglesATask() public {
    TodoList todoList = TodoList(DeployedAddresses.TodoList());

    //Create a task
    todoList.createTask(address(0), "Test Title", "Test Description");
    
    //Toggle the task to complete
    todoList.toggleCompleted(1);
    (uint256 id, address createdBy, string memory title, string memory description, bool completed) = todoList.getTask(1);
    //Test that the task is completed
    Assert.equal(completed, true, "The test should be toggled to completed");

    //Toggle the task to incomplete
    todoList.toggleCompleted(1);
    (id, createdBy, title, description, completed) = todoList.getTask(1);
    //Test that the task in incomplete
    Assert.equal(completed, false, "The test should be toggled to incomplete");
  }

  function testItCreatesMultipleTasks() public {
    TodoList todoList = TodoList(DeployedAddresses.TodoList());

    //Create a task
    todoList.createTask(address(0), "Test Title1", "Test Description1");
    todoList.createTask(address(0), "Test Title2", "Test Description2");
    todoList.createTask(address(0), "Test Title3", "Test Description3");

    //The tasks expected values
    address expectedAddress = address(0);
    bool expectedCompleted = false;

    //Get the values of the created task
    (uint256 id, address createdBy, string memory title, string memory description, bool completed) = todoList.getTask(3);
  
    //Test that the values are correct
    Assert.equal(createdBy, expectedAddress, "It should have the address 0.");
    Assert.equal(title, "Test Title1", "It should have the title 'Test Title1'.");
    Assert.equal(description, "Test Description1", "It should have the description 'Test Description1'.");
    Assert.equal(completed, expectedCompleted, "It should not be completed");

    (id, createdBy, title, description, completed) = todoList.getTask(4);
  
    //Test that the values are correct
    Assert.equal(createdBy, expectedAddress, "It should have the address 0.");
    Assert.equal(title, "Test Title2", "It should have the title 'Test Title2'.");
    Assert.equal(description, "Test Description2", "It should have the description 'Test Description2'.");
    Assert.equal(completed, expectedCompleted, "It should not be completed");

    (id, createdBy, title, description, completed) = todoList.getTask(5);
  
    //Test that the values are correct
    Assert.equal(createdBy, expectedAddress, "It should have the address 0.");
    Assert.equal(title, "Test Title3", "It should have the title 'Test Title3'.");
    Assert.equal(description, "Test Description3", "It should have the description 'Test Description3'.");
    Assert.equal(completed, expectedCompleted, "It should not be completed");


    uint256 count = todoList.taskCount();
    Assert.equal(count, 5, "There should be 5 tasks total");
  }

}
