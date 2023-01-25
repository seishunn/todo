import React from 'react';
import cl from './Profile.module.scss';
import Button from "../../UI/button/Button";
import {IUser} from "../../../reducers/user-reducer";
const userImage = require("../../../assets/images/Sample_User_Icon.png");

interface IProfile {
    user: IUser
    logout: () => void
}

const Profile: React.FC<IProfile> = ({user, logout}) => {
    return (
        <div className={cl.profile}>
            <div className={cl.profile_background}>
                <img src={userImage} alt=""/>
                <div className={cl.profile_background__shadow}/>
            </div>
            <div className={cl.profile_block}>
                <div className={cl.profile_image}>
                    <img src={userImage} alt=""/>
                </div>
                <div className={cl.profile_info}>
                    <div className={cl.profile_title}>{user.login}</div>
                    <div className={cl.profile_buttons}>
                        <Button buttonStyle={"grey"} onClick={logout}>Выйти</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
