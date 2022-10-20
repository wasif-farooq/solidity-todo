let instance;
class ServiceFactory {

    this.services = new Map();

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

    enable(web3) {
        for (let [key, value] of this.services) {
            value.enable(web3);
        }
    }
}

export default ServiceFactory.getInstance();