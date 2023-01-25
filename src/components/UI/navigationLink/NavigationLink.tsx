import React from 'react';
import cl from './NavigationLink.module.scss';
import {IconsSvg} from "../../../assets/icons/Icons";

interface ITodoListLink {
    title: string
    count: number
    deleteTodoList: () => void
    [propName: string]: any
}

const TodoListLink: React.FC<ITodoListLink> = ({title, count, deleteTodoList, ...props}) => {
    return (
        <li className={cl.navlink} {...props}>
            <span className={cl.navlink_title}>{title}</span>
            <span
                className={cl.navlink_trash}
                onClick={deleteTodoList}
            >{new IconsSvg().trash()}</span>
        </li>
    );
};

export default React.memo(TodoListLink);
