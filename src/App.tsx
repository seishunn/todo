import React, {useEffect} from 'react';
import './App.scss';
import {Route, Routes} from "react-router-dom";
import AuthPage from "./pages/Auth/AuthPage";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {auth} from "./actions/user";
import {getTodoLists} from "./actions/todo";
import Main from "./pages/Main/Main";
import {toast, ToastContainer} from "react-toastify";

function App() {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user.user);
    const notification = useAppSelector(state => state.notification.notification);

    useEffect(() => {
        dispatch(auth());
    }, [])

    useEffect(() => {
        dispatch(getTodoLists());
    }, [user.id]);

    useEffect(() => {
        if (notification.message) {
            if (notification.error) {
                toast.error(notification.message, {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                toast.success(notification.message, {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
    }, [notification]);

    return (
        <div className={"app"}>
            <ToastContainer/>
            <Routes>
                <Route path={'/auth/*'} element={<AuthPage/>}/>
                <Route path={'*'} element={
                    <Main/>
                }/>
            </Routes>
        </div>
    );
}

export default App;
