import { Button, notification, Spin} from 'antd';
import {useMetaMask} from "metamask-react";
import serviceFacoty from '../../services';
import {useEffect, useState} from "react";
import {LoadingOutlined} from "@ant-design/icons";

export const Configuration = ({ children }) => {
    const {status, connect, account, ethereum} = useMetaMask();
    const [configured, setConfigured] = useState(false)

    const notificationProps = {
        key: 'updatable',
        placement: 'bottomLeft',
        duration: null,
        closeIcon: () => null
    }

    useEffect(() => {
        console.log("status :",status)
        if (
            status === 'connected' &&
            account &&
            ethereum
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
    }, [status, ethereum, account, connect, notificationProps])

    if (status === "connected" && configured) {
        notification.destroy();
        return <>{children}</>;
    }

    return null;

}