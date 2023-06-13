//SPDX-License-Identifier: MIT
pragma solidity >=0.5.0;
pragma experimental ABIEncoderV2;

contract Todo {
   uint public taskCount;

   struct Task {
    uint num;
    string desc;
    bool status;
   }

   mapping(uint=>Task) tasks;

   constructor() public { 
    createTask("Welcome");
   }
   
   function getTaskCount() public view returns(uint){
      return taskCount;
   }

  function getTasks() public view returns(Task[] memory) {
    uint count = taskCount;
    Task[] memory _tasks = new Task[](count);
    for (uint i = 0; i < count; i++) {
      _tasks[i] = tasks[i];
    }
    return _tasks;
  }

   function createTask(string memory _desc) public {
        
         tasks[taskCount]=Task(taskCount, _desc, false); 
        //  unchecked{
          taskCount++;
        // }
   }


}
