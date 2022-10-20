var TodoList = artifacts.require("./contracts/TodoList.sol");

module.exports = function(deployer) {
    // Demo is the contract's name
    deployer.deploy(TodoList);
};