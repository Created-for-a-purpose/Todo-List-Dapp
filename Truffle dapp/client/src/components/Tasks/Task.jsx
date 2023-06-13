import React, {useState, useEffect} from 'react'
import Web3 from'web3'

const Task = ()=>{
    
    const [web3, setWeb3] = useState(null)
    const [defaultAccount, setAccount] = useState(null)
    const [contract, setContract] = useState(null)
    const [inputTodo, setInput] = useState('')
    const [todo, setTodo] = useState([])
    
      
      useEffect(()=>{
        const connectMetamask=async()=>{
          const contractAddress="0xa982447FBA093c3644A891c3EB128833fcA0AAd6";
          try{
            const { ethereum } = window;
    
            if (ethereum) {
              const account = await ethereum.request({
                method: "eth_requestAccounts",
              });
    
            setAccount(account)
            const web3Instance = new Web3(window.ethereum)
            setWeb3(web3Instance)
            const artifact = require("../../contracts/Todo.json");
            const { abi } = artifact;
            let contractInstance;
            try {
              contractInstance = new web3.eth.Contract(abi, contractAddress);
              console.log("Debug", contractInstance)
            } catch (err) {
              console.error(err);
            }
            setContract(contractInstance)
            } else {
              alert("Please install metamask");
            }
          }
          catch(error){};
        }
        connectMetamask();
      }, []);
    
    const handleSubmit = (event)=>{
       event.preventDefault()
       addTodo()
       setInput('')
    }

    const handleInputChange = (event)=>{
       setInput(event.target.value)
    }

    const addTodo = async ()=>{
         await contract.methods.createTask(inputTodo).send({
            from: defaultAccount
         })
         getTodos()
    }

    const getTodos = async ()=>{
        const todoList = await contract.methods.tasks().send({
            from: defaultAccount
        })
        setTodo(todoList)
    }

     return(
        <div>
            <h1>Todo List:</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={inputTodo} onChange={handleInputChange} placeholder='Enter a new todo'/>
                <button type="submit">Add Todo</button>
            </form>
            <ul>
                {todo.map((todo, index)=>(
                    <li key={index}>{todo}</li>
                ))}
                
            </ul>
        </div>
     )

 }

export default Task;
