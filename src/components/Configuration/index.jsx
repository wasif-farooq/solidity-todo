import { Button, notification, Spin} from 'antd';
import {useMetaMask} from "metamask-react";
import serviceFacoty from '../../services';
import {useEffect, useState} from "react";
import {LoadingOutlined} from "@ant-design/icons";
import Enable from '../../contexts/enable';
import constants from '../../constants';

export const Configuration = ({ children }) => {
    const {status, connect, account, ethereum, chainId} = useMetaMask();
    const [configured, setConfigured] = useState(false)

    useEffect(() => {

        const notificationProps = {
            key: 'updatable',
            placement: 'bottomLeft',
            duration: null,
            closeIcon: () => null
        }

        if (
            status === 'connected' &&
            account &&
            ethereum &&
            chainId === constants.chain
        ) {
            serviceFacoty.enable(account, ethereum).then(() => setConfigured(true))
        }

        if (status === "initializing") {
            notification.open({
                ...notificationProps,
                description: <Spin indicator={LoadingOutlined}/>
            });
        }

        if (status === "unavailable") {
            notification.open({
                ...notificationProps,
                description: 'MetaMask not available. Please firest install MetaMaks'
            });
        }

        if (status === "notConnected") {
            notification.open({
                ...notificationProps,
                description: <Button block onClick={connect}>Connect to MetaMask</Button>
            });
        }

        if (status === "connecting") {
            notification.open({
                ...notificationProps,
                description: 'Connecting...'
            });
        }

        if (status === "connected" && chainId === constants.chain) {
            notification.open({
                ...notificationProps,
                description: 'Please select correct chain'
            });
        }
    }, [status, ethereum, account, connect, chainId])

    if (status === "connected" && configured && chainId === constants.chain) {
        notification.destroy();
        return (
            <Enable.Provider value={configured}>
                <>{children}</>
            </Enable.Provider>
        );
    }

    return null;

}