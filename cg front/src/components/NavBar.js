import React from 'react';
import { Link } from 'react-router-dom';

import Login from './login/Login';
import Register from './login/Register';

import styles from '../../styles/components/login/NavBar.module.css';

export default function NavBar() {
    return (
        <>
            <div className={styles.wrapper}>

                <Link to='/'>Личный кабинет</Link>
                <Link to='/'>Моя команда</Link>
Кейсы
Расписание
Менторы
Новости хакатона
Партнеры
О хакатоне
Карта хакатона
            </div>

            <Register/>
            <Login/>
        </>
    )
}


