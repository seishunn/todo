import React from 'react';
import cl from './Navbar.module.scss';
import NavigationLink from "../UI/navigationLink/NavigationLink";

const Navbar = () => {
    return (
        <div className={cl.navbar}>
            <ul className={cl.navbar_list}>
                <NavigationLink title={'Входящие'} count={2}/>
            </ul>
        </div>
    );
};

export default Navbar;
