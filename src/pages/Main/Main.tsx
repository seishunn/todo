import React from 'react';
import Navbar from "../../components/navbar/Navbar";
import {Navigate, Route, Routes} from "react-router-dom";
import TodoList from "../../components/todoList/TodoList";
import {useAppSelector} from "../../hooks/redux";
import 'react-toastify/dist/ReactToastify.css'

const Main = () => {
    const isAuth = useAppSelector(state => state.user.isAuth);

    if (!isAuth) {
        return <Navigate to={'/auth/login'}/>
    }


    return (
        <div className={"app_wrapper"}>
            <div>
                <Navbar/>
            </div>
            <Routes>
                <Route path={'/'} element={<TodoList/>}/>
            </Routes>
        </div>
    );
};

export default Main;
