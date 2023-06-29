import './App.css';
import LoginForm from "./components/login"
import SignupForm from "./components/signup"
import TodoList from "./components/todolist"
import TodoForm from "./components/todolistadd"

function App() {
  return (
    <div className="App">
      < SignupForm/>
      < LoginForm/>
      < TodoForm/>
      < TodoList/>
    </div>
  );
}

export default App;
