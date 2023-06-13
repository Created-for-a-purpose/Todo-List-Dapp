const TodoList = artifacts.require("Todo");

 module.exports = async function(deployer,_,accounts) {
    deployer.deploy(TodoList);
    // const todoList = await TodoList.deployed();
    // const taskCount = await todoList.taskCount();
    // console.log("Task Count:", taskCount.toNumber())
};
