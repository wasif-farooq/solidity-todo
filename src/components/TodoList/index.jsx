import React, {useEffect, useState} from "react";
import {Checkbox, List} from "antd";
import {useMetaMask} from "metamask-react";
import Web3 from 'web3';

import contractJson from '../../contracts/TodoList.json';
const {abi} = contractJson;

const data = [
    {
        title: "Ant Design Title 1"
    },
    {
        title: "Ant Design Title 2"
    },
    {
        title: "Ant Design Title 3"
    },
    {
        title: "Ant Design Title 4"
    }
];

export const TodoList = () => {
    const { status, connect, account, chainId, ethereum } = useMetaMask();
    const [items, setItems] = useState([])

    useEffect(() => {
        if (status === 'connected') {
            const web3 = new Web3(ethereum)
            web3.eth.defaultAccount = account;
            web3.eth.getBalance(account).then(bal => console.log("getBalance :", bal))

            const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
            const contract = new web3.eth.Contract(abi, contractAddress);
            contract.methods.getItems().call({from: account}).then(function (tx) {
                setItems(tx.map(item => ({
                    id: item.id,
                    title: item.title,
                    isCompleted: item.isCompleted
                })))
                console.log("items: ", tx[0].title);
            });
        }
    },[ethereum, status, account])

    return (
        <List
            itemLayout="horizontal"
            dataSource={items}
            renderItem={(item) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Checkbox value={item.title}/>}
                        title={<a href="https://ant.design">{item.title}</a>}
                    />
                </List.Item>
            )}
        />
    );
}