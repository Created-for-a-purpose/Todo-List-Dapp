import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import TodoListContract from './contracts/Todo.json';

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const init = async () => {
      try {
        // Connect to MetaMask
        if (typeof window.ethereum !== 'undefined') {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          const accounts = await web3Instance.eth.getAccounts();
          setAccounts(accounts);

          // Load the contract
          const networkId = await web3Instance.eth.net.getId();
          const contractAddress = "0x0526f3C63316ee03373deaf2ae335Aa9821958e5";
          const todoListInstance = new web3Instance.eth.Contract(
            TodoListContract.abi,
            contractAddress
          );
           setContract(todoListInstance);
         
          // Fetch initial todos
          getTodos();
          

        } else {
          console.log('Please install MetaMask to use this application.');
        }
      } catch (error) {
        console.error('Error initializing the application:', error);
      }
    };

     init();
  }, [contract]);

  const getTodos = async () => {
    try {
      console.log("contract:", contract)
      let todos = [];
     
      if(contract!==null){

        const todoCount = await contract.methods.getTaskCount().call();
        
          let todo = await contract.methods.getTasks().call();
          // todo = todo.map((t) => t.desc)
          // console.log("todo", todo[0]);
          todos = [...todo]
      }
      setTodos(todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    
    if (!newTodo) return;

    try {
      await contract.methods.createTask(newTodo).send({ from: accounts[0] });
      setNewTodo('');
      getTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <div>
      
      <h1>Decentralized Todo List</h1>

      <form onSubmit={addTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
        />
        <button type="submit">Add Todo</button>
      </form>
      <hr/>
      <h1>Your tasks: </h1>
      <ul>
        {todos.map((todo, index) => {
          // console.log("Todo", todo);
          return (<h3><li key={index}><p>{index}. {todo.desc} --{!todo.status && <b>Incomplete</b>}</p></li></h3>);
})}
      </ul>
    </div>
  );
};

export default App;

