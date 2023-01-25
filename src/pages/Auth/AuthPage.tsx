import React from 'react';
import cl from './AuthPage.module.scss';
import {Navigate, Route, Routes} from "react-router-dom";
import LogInForm from "./LogInForm";
import RegistrationForm from "./RegistrationForm";
import {useAppSelector} from "../../hooks/redux";

const AuthPage = () => {
    const isAuth = useAppSelector(state => state.user.isAuth);

    if (isAuth) {
        return <Navigate to={'/'}/>
    }

    return (
        <div className={cl.auth}>
            <div className={cl.auth_block}>
                <Routes>
                    <Route path={'/login'} element={<LogInForm/>}/>
                    <Route path={'/registration'} element={<RegistrationForm/>}/>
                    <Route path={'*'} element={<LogInForm/>}/>
                </Routes>
            </div>
        </div>
    );
};

export default React.memo(AuthPage);
