// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TodoList {
    struct TodoItem {
        uint id;
        string title;
        bool isCompleted;
    }

    uint lastId;
    mapping(address => mapping(uint => TodoItem)) public items;
    mapping(address => uint[]) itemsIds;

    event ItemCreated (
        address indexed owner,
        uint indexed id,
        string value
    );

    event ItemUpdated (
        address indexed owner,
        uint indexed id,
        bool isCompleted
    );

    function getNextItemId() internal returns (uint) {
        return ++lastId;
    }

    function getItems() view public returns (TodoItem[] memory) {
        uint total = itemsIds[msg.sender].length;
        TodoItem[] memory result = new TodoItem[](total);
        for (uint i; i < total; i++) {
            uint _id = itemsIds[msg.sender][i];
            result[i] = items[msg.sender][_id];
        }
        return result;
    }

    function add(string memory value) external {
        require(bytes(value).length > 0, "Please add todo item name");
        uint id = getNextItemId();

        TodoItem memory item = TodoItem(
            id,
            value,
            false
        );
        items[msg.sender][id] = item;
        itemsIds[msg.sender].push(id);

        emit ItemCreated({
            owner: msg.sender,
            id: id,
            value: value
        });
    }

    function toggle(uint _id, bool isComplete) external {
        require(_id > 0, "Please add todo item name");
        items[msg.sender][_id].isCompleted = isComplete;

        emit ItemUpdated({
            owner: msg.sender,
            id: _id,
            isCompleted: isComplete
        });
    }
}
