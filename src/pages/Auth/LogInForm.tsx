import React, {useState} from 'react';
import cl from "./AuthPage.module.scss";
import InputLabel from "../../components/UI/inputLabel/InputLabel";
import Button from "../../components/UI/button/Button";
import {useAppDispatch} from "../../hooks/redux";
import {login} from "../../actions/user";
import {NavLink} from "react-router-dom";

const LogInForm = () => {
    const [loginInfo, setLoginInfo] = useState({login: "", password: ""});
    const dispatch = useAppDispatch();


    return (
        <div>
            <div className={cl.auth_block__title}>Войти
                <NavLink to={'/auth/registration'}>или зарегистрироваться</NavLink>
            </div>
            <div className={cl.auth_block__form}>
                <InputLabel
                    value={loginInfo.login}
                    changeValue={str => setLoginInfo({...loginInfo, login: str})}
                    placeholder={"Введите свою почту..."}
                    inputLabel={"Email"}
                    inputType={"text"}
                />
                <InputLabel
                    value={loginInfo.password}
                    changeValue={str => setLoginInfo({...loginInfo, password: str})}
                    placeholder={"Введите ваш пароль..."}
                    inputLabel={"Password"}
                    inputType={"password"}
                />
                <Button
                    buttonStyle={"orange"}
                    style={{fontSize: "18px", width: "200px"}}
                    onClick={() => {
                        dispatch(login(loginInfo.login, loginInfo.password));
                    }}
                >Войти</Button>
            </div>
        </div>
    );
};

export default LogInForm;
