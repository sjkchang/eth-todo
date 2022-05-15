import React, { Component } from "react";
import TodoListContract from "./contracts/TodoList.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = {web3: null, accounts: null, contract: null, tasks: [] };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = TodoListContract.networks[networkId];
      const instance = new web3.eth.Contract(
        TodoListContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state
      this.setState({ web3, accounts, contract: instance }, this.fetchTasks);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  //Fetch the tasks that were created by the current account
  fetchTasks = async () => {
    const { accounts, contract } = this.state;
    const taskCount = await contract.methods.taskCount().call();
    let tempTasks = []
    for(let i = 1; i <= taskCount; i++) {
      const task = await contract.methods.tasks(i).call();
      if(task.createdBy == accounts[0]){
        tempTasks.push(task);
      }
    }
    this.setState({ tasks: tempTasks });
    console.log(this.state.tasks)
  };

  createTask = async (title, description) => {
    const { accounts, contract } = this.state;

    let response = await contract.methods.createTask(accounts[0], title, description).send({ from: accounts[0]});
    let task = response.events.TaskCreated.returnValues;
    this.state.tasks.push(task)
    this.setState({tasks: this.state.tasks})
  };

  toggleCompleted = async (taskId) => {
    const { accounts, contract } = this.state;

    await contract.methods.toggleCompleted(taskId).send({ from: accounts[0] })
    let task = await contract.methods.tasks(taskId).call();
    let tempTasks = this.state.tasks;
    for(let i = 0; i < tempTasks.length; i++) {
      if(tempTasks[i].id === taskId) {
        tempTasks[i] = task;
      }
    }
    this.setState({tasks: tempTasks});
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <label>
          <h1>Add a task:</h1>
          <form className="form " onSubmit={(event) => {
                event.preventDefault()
                this.createTask(event.target.title.value, event.target.description.value)
                event.target.title.value = ""
                event.target.description.value = ""
              } 
            }>
            <label className="form-title" >
              Task Title: 
              <input type="text" name="title" />
            </label>
            <br/>
            <label className="form-description">
              Task Description: 
              <input type="text" name="description" />
            </label>
            <br/>
            <input type="submit" value="Add Task"  />
          </form>
        </label>
        <h1>Todo List</h1>
        <ul className="todo-list">
          {this.state.tasks.map((task, index) => (
            <li className="task" key={index}>
                <strong>Task Title: </strong> {task.title + " "}
                <strong>Task Description: </strong> {task.description}
                <input type="checkbox" checked={task.completed} onChange={() => this.toggleCompleted(task.id)} />
            </li>
          ))}
        </ul>
        
        
      </div>
    );
  }
}

export default App;
