import Web3 from "web3";

let instance;
class ServiceFactory {

    constructor() {
        this.services = new Map();
        this.web3 = null;
    }

    static getInstance() {
        if (instance) return instance;
        instance = new ServiceFactory()
        return instance;
    }

    add(name, value) {
        if (!name) throw new Error('please provide service name');
        if (!value) throw new Error('please provide service instance');
        this.services.set(name, value);
    }

    get(name) {
        if (!name) throw new Error('please provide service name');
        const service = this.services.get(name);
        if (!service.enabled) throw new Error(`service ${name} not enabled yet`);
        return service;
    }

    enable(account, provider) {
        if (!account) throw new Error('Please provide account');
        if (!provider) throw new Error('Please provide provider');

        this.web3 = new Web3(provider)
        this.web3.eth.defaultAccount = account;

        for (let [, value] of this.services) {
            value.enable(this.web3);
        }
    }
}

export default ServiceFactory.getInstance();