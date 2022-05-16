const TodoList = artifacts.require("./TodoList.sol");

contract("TodoList", accounts => {
  it("...should create a task.", async () => {
    const todoListInstance = await TodoList.deployed();

    //Create a task, and fetch it.
    await todoListInstance.createTask(accounts[0], "test title", "test description");
    const task = await todoListInstance.tasks(1);

    //Test that the task was created properly
    assert.equal(task.title, "test title", "The title was incorrect.");
    assert.equal(task.description, "test description", "The description was incorrect.");
    assert.equal(task.completed, false, "The task shouldn't be completed.");
  });

  it("...should create toggle a tasks completion.", async () => {
    const todoListInstance = await TodoList.deployed();

    //Create a task
    await todoListInstance.createTask(accounts[0], "test title", "test description");

    //Toggle its completion and test
    await todoListInstance.toggleCompleted(1);
    let task = await todoListInstance.tasks(1);
    assert.equal(task.completed, true, "The Task should be completed");
    
    //Toggle its completion and test again
    await todoListInstance.toggleCompleted(1);
    task = await todoListInstance.tasks(1);
    assert.equal(task.completed, false, "The Task should be incomplete");
  });

  it("...should create multiple tasks.", async () => {
    const todoListInstance = await TodoList.deployed();

    //Create a task
    await todoListInstance.createTask(accounts[0], "test title1", "test description1");
    let task = await todoListInstance.tasks(3);

    //Test that the task was created properly
    assert.equal(task.title, "test title1", "The title was incorrect.");
    assert.equal(task.description, "test description1", "The description was incorrect.");
    assert.equal(task.completed, false, "The task shouldn't be completed.");

    await todoListInstance.createTask(accounts[0], "test title2", "test description2");
    task = await todoListInstance.tasks(4);

    //Test that the task was created properly
    assert.equal(task.title, "test title2", "The title was incorrect.");
    assert.equal(task.description, "test description2", "The description was incorrect.");
    assert.equal(task.completed, false, "The task shouldn't be completed.");


  });
});
