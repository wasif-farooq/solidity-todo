import {LoadingOutlined} from '@ant-design/icons';
import {Alert, Spin} from 'antd';
import {TodoList} from "src/components/TodoList";
import {useMetaMask} from "metamask-react";


function App() {
    const {status, connect, account, chainId, ethereum} = useMetaMask();

    if (status === "initializing") return (
        <Spin indicator={LoadingOutlined}/>
    )

    if (status === "unavailable") return (
        <Alert
            message="Error"
            description="MetaMask not available. Please firest install MetaMaks"
            type="error"
            closable
        />
    )

    if (status === "notConnected") return (
        <button onClick={connect}>Connect to MetaMask</button>
    )

    if (status === "connecting") return (
        <Alert
            message="info"
            description="Connecting..."
            type="info"
            closable
        />
    )

    if (status === "connected") return (
        <div className="App">
            <TodoList/>
        </div>
    )
}

export default App;
