import React, { useState, } from 'react';
import { Link } from 'react-router-dom';

import Login from './login/Login';
import Register from './login/Register';

import styles from '../styles/components/Tamplate.module.css';

export default function Tamplate({children}) {
    const [isRegister, setRegister] = useState(false);
    const [isLogin, setLogin] = useState(false);

    return (
        <>
            <div className={styles.navBar}>

                <Link to='/UserAccount'>
                    <div className={styles.linkElem}>
                        Личный кабинет
                    </div>
                </Link>
  
                    <div 
                        onClick={() => setLogin(true)}
                        className={styles.linkElem}
                    >
                        Авторизоваться
                    </div>

   
                    <div 
                        onClick={() => setRegister(true)}
                        className={styles.linkElem}
                    >
                        Зарегистрироваться
                    </div>

                <Link to='/MyTeam'>
                    <div className={styles.linkElem}>
                        Моя команда
                    </div>
                </Link>
                <Link to='/Cases'>
                    <div className={styles.linkElem}>
                        Кейсы
                    </div>
                </Link>
                <Link to='/'>
                    <div className={styles.linkElem}>
                        Расписание
                    </div>
                </Link>
                <Link to='/Mentors'>
                    <div className={styles.linkElem}>
                        Менторы
                    </div>
                </Link>
                <Link to='/Partners'>
                    <div className={styles.linkElem}>
                        Партнеры
                    </div>
                </Link>
                <Link to='/AboutHackathon'>
                    <div className={styles.linkElem}>
                        О хакатоне
                    </div>
                </Link>
                <Link to='/HackathonMap'>
                    <div className={styles.linkElem}>
                        Карта хакатона 
                    </div>
                </Link>
 
            </div>

            <div className={styles.pageContent}>
                {children}
            </div>

            <Register control={{isRegister, setRegister}}/>
            <Login control={{isLogin, setLogin}}/>
        </>
    )
}


