import React from 'react';
import Navbar from "./components/navbar/Navbar";
import './App.scss';
import TodoList from "./components/todoList/TodoList";

function App() {
    return (
        <div className={"app"}>
            <Navbar/>
            <TodoList/>
        </div>
    );
}

export default App;
