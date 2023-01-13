import React from 'react';
import cl from './NavigationLink.module.scss';

interface INavigationLinkProps {
    title: string
    count: number
}

const NavigationLink: React.FC<INavigationLinkProps> = ({title, count}) => {
    return (
        <li className={cl.navlink}>
            <span className={cl.navlink_title}>{title}</span>
            <span className={cl.navlink_count}>{count}</span>
        </li>
    );
};

export default NavigationLink;
