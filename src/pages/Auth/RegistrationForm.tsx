import React, {useState} from 'react';
import cl from "./AuthPage.module.scss";
import InputLabel from "../../components/UI/inputLabel/InputLabel";
import Button from "../../components/UI/button/Button";
import {registration} from "../../actions/user";
import {NavLink} from "react-router-dom";
import {useAppDispatch} from "../../hooks/redux";

const RegistrationForm = () => {
    const [registrationForm, setRegistrationForm] = useState({email: "", login: "", password: ""});
    const dispatch = useAppDispatch();

    const registrationHandle = (email: string, login: string, password: string) => {
        dispatch(registration(email, login, password))
    }

    return (
        <div>
            <div className={cl.auth_block__title}>Регистрация
                <NavLink to={'/auth/login'}>или войти</NavLink>
            </div>
            <div className={cl.auth_block__form}>
                <InputLabel
                    value={registrationForm.email}
                    changeValue={str => setRegistrationForm({...registrationForm, email: str})}
                    placeholder={"Введите свою почту..."}
                    inputLabel={"Email"}
                    inputType={"text"}
                />
                <InputLabel
                    value={registrationForm.login}
                    changeValue={str => setRegistrationForm({...registrationForm, login: str})}
                    placeholder={"Введите свой никнейм..."}
                    inputLabel={"Login"}
                    inputType={"text"}
                />
                <InputLabel
                    value={registrationForm.password}
                    changeValue={str => setRegistrationForm({...registrationForm, password: str})}
                    placeholder={"Введите ваш пароль..."}
                    inputLabel={"Password"}
                    inputType={"password"}
                />
                <Button
                    buttonStyle={"orange"}
                    style={{fontSize: "18px", width: "200px"}}
                    onClick={() => registrationHandle(registrationForm.email, registrationForm.login, registrationForm.password)}
                >Создать аккаунт</Button>
            </div>
        </div>
    );
};

export default RegistrationForm;
