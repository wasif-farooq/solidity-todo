import {TodoList} from "./components/TodoList";
import {Configuration} from "./components/Configuration";
import {Layout} from 'antd';
const {  Content } = Layout;

function App() {
    return (
        <Layout hasSider>
            <Layout className="site-layout" style={{marginLeft: 0}}>
                <Content style={{margin: '24px 16px 0', overflow: 'initial', width: '500px', textAlign: 'left'}}>
                    <Configuration>
                        <div className="App">
                            <TodoList/>
                        </div>
                    </Configuration>
                </Content>
            </Layout>
        </Layout>
    )
}

export default App;
