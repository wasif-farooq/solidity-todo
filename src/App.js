import {TodoList} from "./components/TodoList";
import {Configuration} from "./components/Configuration";


function App() {
    return (
        <Configuration>
            <div className="App">
                <TodoList />
            </div>
        </Configuration>
    )
}

export default App;
