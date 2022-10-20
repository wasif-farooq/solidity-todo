import {abi} from '../contracts/TodoList.json';
import constants from "../constants";

export class TodoService {
    constructor() {
        this.address = constants.address.todo
        this.enabled = false;
        this.web3 = null;
        this.contract = null
    }

    enable(web3) {
        this.web3 = web3;
        this.contract = new web3.eth.Contract(abi, this.address);
        this.enabled = true;
    }

    async all() {
        try {
            const account = await this.web3.eth.getAccounts();
            const items = await this.contract.methods.getItems().call({from: account[0]});
            return items.map(item => ({
                id: item.id,
                title: item.title,
                isCompleted: item.isCompleted
            }))
        } catch (e) {
            console.error(e);
            return [];
        }
    }
}