import React, { Component } from "react";
import TodoListContract from "./contracts/TodoList.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, tasks: [] };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = TodoListContract.networks[networkId];
      const instance = new web3.eth.Contract(
        TodoListContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.createTask("First", "Task").send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const taskCount = await contract.methods.taskCount().call();
    console.log(taskCount);

    for(let i = 1; i <= taskCount; i++) {
      const task = await contract.methods.tasks(i).call();
      this.state.tasks.push(task);
    }
    console.log(this.state.tasks);
    // Update state with the result.
    this.setState({ storageValue: taskCount });
  };

  buttonTest = async () => {
    const { accounts, contract } = this.state;

    await contract.methods.createTask("Button", "Test").send({ from: accounts[0] });
    const taskCount = await contract.methods.taskCount().call();

    const task = await contract.methods.tasks(taskCount).call();
    this.state.tasks.push(task);
    console.log(this.state.tasks);
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 42</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
        <button type="button" onClick={this.buttonTest}></button>
      </div>
    );
  }
}

export default App;
