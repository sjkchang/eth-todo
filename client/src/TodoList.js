import React, { useState, useEffect } from 'react';
import TodoListContract from "./contracts/TodoList.json";
import getWeb3 from "./getWeb3";
//import "./App.css";

function TodoList(props){
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract,]
  const [tasks, setTasks] = useState([]);
  const [count, setCount] = useState(0);
  //const [title, setTitle] = useState("");
  //const [description, setDescription] = useState("");


  const getWeb3 = async () => {
    try{
      const web3 = await getWeb3();
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = TodoListContract.networks[networkId];
      const contract = new web3.eth.Contract(
        TodoListContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      return {web3: web3, accounts: accounts, contract: contract}
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }

  const fetchTasks = async () => {
    const {web3, accounts, contract} = await getWeb3();
    if(accounts == null &&  contract == null) return;
    const taskCount = await contract.methods.taskCount().call();
    let tempTasks = [];
    for(let i = 1; i <= taskCount; i++) {
      const task = await contract.methods.tasks(i).call();
      if(task.createdBy == accounts[0]){
        tempTasks.push(task);
      }
    }
    setTasks(tasks);
  }
  fetchTasks();

/*
  const createTask = async (title, description) => {
   
    contract.methods.createTask(accounts[0], title, description).send({ from: accounts[0] })
  }

  const toggleCompleted = async (taskId) => {
    if(accounts == null &&  contract == null) return;
    contract.methods.toggleCompleted(taskId).send({ from: accounts[0] })
  }*/

  return (
    web3 ? 
    <div>
      Task Count: {count}
      {console.log(tasks)}

      <ul>
        {tasks.map((task, index) => 
          <li>Task Title: {task.title}</li>
        )}
      </ul>
    </div> 
    : <h1>loading...</h1>
  );

}

/*
class TodoList extends Component {
    state = {title: "Title", description: "Description", tasks: [] };
    task = {title: "Title", description: "Description"};

    constructor (props){
      super(props);
      let tasks = [];
      for(let i = 0; i < props.tasks.length; i++){
        console.log(tasks[i])
        let task = [];
        task[0] = props.tasks[i].title;
        task[1] = props.tasks[i].description;
      }
      this.state = {title: "Title", description: "Description", tasks: tasks}
    }

    getTasks = () => {
      console.log(this.props.tasks)
      console.log(JSON.stringify(this.state.tasks))
    }

    render() {
      return (
        <div>
          <div><h1>Todo List</h1></div>
          <ul>
            {this.getTasks()}
          </ul>
          <form onSubmit={(event) => {
              event.preventDefault()
              this.props.createTask(this.task.title, this.task.description)} 
            }>
            <label>
              Task Title:
              <input type="text" name="name" onChange={ (event) => {
                this.task.title = event.target.value;
              } }/>
            </label>
            <label>
              Task Description:
              <input type="text" name="name" onChange={ (event) => {
                this.task.description = event.target.value;
              } } />
            </label>
            <input type="submit" value="Add Tax"  />
          </form>
        </div>
        
      );
    }
  }
  */
  export default TodoList;
  