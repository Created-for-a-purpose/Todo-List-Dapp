const Todo = artifacts.require("Todo");

contract('Todo List tests', () => {
  let todo;
  before(async()=>{
    todo = await Todo.deployed();
  })

  it('Deploys successfully', async()=>{
    const address = await todo.address;
    assert.notEqual(address, 0x0);
    assert.notEqual(address, '');
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
  })

  it('First task should be welcome', async()=>{
    const tasks = await todo.getTasks()
    // console.log(typeof tasks[0].desc)
    assert(tasks[0].desc=="Welcome");
  })

  it('Creates new tasks successfully', async()=>{
    const taskCounti = await todo.getTaskCount()
    await todo.createTask('New task')
    const taskCountf = await todo.getTaskCount()
     const tasks = await todo.getTasks()
    //  console.log(typeof taskCounti)
     assert(taskCounti.toNumber()+1==taskCountf.toNumber())
     assert(tasks[taskCounti].desc=="New task")
  })

});
