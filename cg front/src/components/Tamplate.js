import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Login from './login/Login';
import Register from './login/Register';

import {GlobalContext} from 'state/context/globalStateContext';

import { useLocation } from 'react-router-dom';

import styles from '../styles/components/Tamplate.module.css';

export default function Tamplate({children}) {
    const { globalState } = useContext(GlobalContext);

    const [isRegister, setRegister] = useState(false);
    const [isLogin, setLogin] = useState(false);

    const location = useLocation();

    const [hash, setHash] = useState('#/');

    const { userData } = globalState;

    return (
        <>
            <div className={styles.navBar}>

                {userData ?
                <Link to='/UserAccount'>
                    <div style={location.pathname === '/UserAccount' ? {color:'#fff'} : {}} className={`${styles.linkElem}`}>
                        <img src={`icons/case${location.pathname === '/UserAccount' ? ' (копия)' : ''}.svg`}/>Кабинет
                    </div>
                </Link>
                    :
                <div onClick={() => setLogin(true)} style={location.pathname === '/UserAccount' ? {color:'#fff'} : {}} className={`${styles.linkElem}`}>
                    <img src={`icons/case${location.pathname === '/UserAccount' ? ' (копия)' : ''}.svg`}/>Кабинет
                </div>}

                {!(userData?.role === 'Ментор') ? 
                <>
                    <Link to='/Session'>
                        <div style={location.pathname === '/Session' ? {color:'#fff'} : {}} className={styles.linkElem}>
                            <img src={`icons/attention${location.pathname === '/Session' ? ' (копия)' : ''}.svg`}/> Менторские сессии
                        </div>
                    </Link>
                    <Link to='/Teams'>
                        <div style={location.pathname === '/Teams' ? {color:'#fff'} : {}} className={styles.linkElem}>
                            <img src={`icons/attention${location.pathname === '/Teams' ? ' (копия)' : ''}.svg`}/> Команды
                        </div>
                    </Link>
                </> : null
                }


                <Link to='/Mentors'>
                    <div style={location.pathname === '/Mentors' ? {color:'#fff'} : {}} className={styles.linkElem}>
                        <img src={`icons/star${location.pathname === '/Mentors' ? ' (копия)' : ''}.svg`}/>Менторы 
                    </div>
                </Link>
                <Link to='/'>
                    <div style={location.pathname === '/' || location.pathname === '/StaticSchedule' ? {color:'#fff'} : {}} className={styles.linkElem}>
                        <img src={`icons/calendar${location.pathname === '/' || location.pathname === '/StaticSchedule' ? ' (копия)' : ''}.svg`}/>Расписание
                    </div>
                </Link>
                <Link to='/HackathonMap'>
                    <div style={location.pathname === '/HackathonMap' ? {color:'#fff'} : {}} className={styles.linkElem}>
                        <img src={`icons/map${location.pathname === '/HackathonMap' ? ' (копия)' : ''}.svg`}/>Карта
                    </div>
                </Link>
                <Link to='/Cases'>
                    <div style={location.pathname === '/Cases' ? {color:'#fff'} : {}} className={styles.linkElem}>
                        <img src={`icons/case${location.pathname === '/Cases' ? ' (копия)' : ''}.svg`}/>Кейсы
                    </div>
                </Link>
                <Link to='/Partners'>
                    <div style={location.pathname === '/Partners' ? {color:'#fff'} : {}} className={styles.linkElem}>
                        <img src={`icons/partners${location.pathname === '/Partners' ? ' (копия)' : ''}.svg`}/>Партнёры
                    </div>
                </Link>
                <Link to='/AboutHackathon'>
                    <div style={location.pathname === '/AboutHackathon' ? {color:'#fff'} : {}} className={styles.linkElem}>
                        <img src={`icons/attention${location.pathname === '/AboutHackathon' ? ' (копия)' : ''}.svg`}/> О хакатоне
                    </div>
                </Link>
 
            </div>

            <div className={styles.pageContent}>
                {children}
            </div>

            <Register control={{isRegister, setRegister, setLogin}}/>
            <Login control={{isLogin, setLogin, setRegister}}/>
        </>
    )
}


