import contract from '../contracts/TodoList.json';
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
        this.contract = new web3.eth.Contract(contract.abi, this.address);
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

    async add(title) {
        try {
            const account = await this.web3.eth.getAccounts();
            const item = await this.contract.methods.add(title).send({from: account[0]});
            console.log("item :", item)
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    async toggle(id, isCompleted) {
        try {
            const account = await this.web3.eth.getAccounts();
            const item = await this.contract.methods.toggle(id, isCompleted).send({from: account[0]});
            console.log("item :", item)
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    async onCreate(callback) {
        const account = await this.web3.eth.getAccounts();
        let options = {
            filter: {
                address: [account[0]],
            },
            fromBlock: 0
        };
        this.contract.events.ItemCreated(options)
            .on('data', ({ returnValues }) => {
                callback({
                    id: returnValues.id,
                    title: returnValues.value,
                    isCompleted: returnValues.isCompleted || false
                })
            })
    }

    async onUpdate(callback) {
        const account = await this.web3.eth.getAccounts();
        let options = {
            filter: {
                address: [account[0]],
            },
            fromBlock: 0
        };

        this.contract.events.ItemUpdated(options)
            .on('data', callback)
    }
}