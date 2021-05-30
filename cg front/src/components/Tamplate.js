import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';

import Login from './login/Login';
import Register from './login/Register';

import {GlobalContext} from 'state/context/globalStateContext';

import { useLocation } from 'react-router-dom';

import useMobile from 'hooks/useMobile'

import styles from '../styles/components/Tamplate.module.css';
import { Button } from '@material-ui/core';

export default function Tamplate({children}) {
    const { globalState } = useContext(GlobalContext);

    const [isRegister, setRegister] = useState(false);
    const [isLogin, setLogin] = useState(false);

    const isMobile = useMobile();
    const [open, setOpen] = useState(false);

    const location = useLocation();

    const { userData } = globalState;
    return (
        <>
            {isMobile ? 
            <div className={styles.burger}>
                <Button onClick={() => setOpen(true)}>
                    <MenuIcon classes={{root:styles.svgColor}}/>
                </Button>
                <div className={styles.name}>
                    {userData ? <>Мы рады вам, {userData.first_name}</> : 'Привет, хакатонщик!'}
                </div>
            </div> : null}

            <div className={styles.navBar} style={open ? {left:'0px'} : {}}>

                {userData ?
                <Link to='/UserAccount'>
                    <div style={location.pathname === '/UserAccount' ? {color:'#fff'} : {}} className={`${styles.linkElem}`}>
                        <img src={`/icons/case${location.pathname === '/UserAccount' ? ' (копия)' : ''}.svg`}/>Кабинет
                    </div>
                </Link>
                    :
                <div onClick={() => setLogin(true)} style={location.pathname === '/UserAccount' ? {color:'#fff'} : {}} className={`${styles.linkElem}`}>
                    <img src={`/icons/case${location.pathname === '/UserAccount' ? ' (копия)' : ''}.svg`}/>Кабинет
                </div>}

                {(userData?.role === 'Ментор') ? 
                <>
                    <Link to='/Session'>
                        <div style={location.pathname === '/Session' ? {color:'#fff'} : {}} className={styles.linkElem}>
                            <img src={`/icons/attention${location.pathname === '/Session' ? ' (копия)' : ''}.svg`}/> Менторские сессии
                        </div>
                    </Link>
                    <Link to='/Teams'>
                        <div style={location.pathname === '/Teams' ? {color:'#fff'} : {}} className={styles.linkElem}>
                            <img src={`/icons/attention${location.pathname === '/Teams' ? ' (копия)' : ''}.svg`}/> Команды
                        </div>
                    </Link>
                </> : null
                }

                {!(userData?.role === 'Ментор') && userData ? 
                    <>
                        <Link to='/Mentors'>
                            <div style={location.pathname === '/Mentors' ? {color:'#fff'} : {}} className={styles.linkElem}>
                                <img src={`/icons/star${location.pathname === '/Mentors' ? ' (копия)' : ''}.svg`}/>Менторы 
                            </div>
                        </Link>

                        <Link to='/UserPeriods'>
                            <div style={location.pathname === '/UserPeriods' ? {color:'#fff'} : {}} className={styles.linkElem}>
                                <img src={`/icons/star${location.pathname === '/UserPeriods' ? ' (копия)' : ''}.svg`}/>История сессий 
                            </div>
                        </Link>
                    </>
                    
                    : null
                }
                <Link to='/'>
                    <div style={location.pathname === '/' || location.pathname === '/StaticSchedule' ? {color:'#fff'} : {}} className={styles.linkElem}>
                        <img src={`/icons/calendar${location.pathname === '/' || location.pathname === '/StaticSchedule' ? ' (копия)' : ''}.svg`}/>Расписание
                    </div>
                </Link>
                <Link to='/HackathonMap'>
                    <div style={location.pathname === '/HackathonMap' ? {color:'#fff'} : {}} className={styles.linkElem}>
                        <img src={`/icons/map${location.pathname === '/HackathonMap' ? ' (копия)' : ''}.svg`}/>Карта
                    </div>
                </Link>
                <Link to='/Cases'>
                    <div style={location.pathname === '/Cases' ? {color:'#fff'} : {}} className={styles.linkElem}>
                        <img src={`/icons/case${location.pathname === '/Cases' ? ' (копия)' : ''}.svg`}/>Кейсы
                    </div>
                </Link>
                <Link to='/Partners'>
                    <div style={location.pathname === '/Partners' ? {color:'#fff'} : {}} className={styles.linkElem}>
                        <img src={`/icons/partners${location.pathname === '/Partners' ? ' (копия)' : ''}.svg`}/>Партнёры
                    </div>
                </Link>
                <Link to='/AboutHackathon'>
                    <div style={location.pathname === '/AboutHackathon' ? {color:'#fff'} : {}} className={styles.linkElem}>
                        <img src={`/icons/attention${location.pathname === '/AboutHackathon' ? ' (копия)' : ''}.svg`}/> О хакатоне
                    </div>
                </Link>
 
            </div>

            <div className={styles.targetClose} style={open ? {display:'block'} : {}} onClick={() => setOpen(false)}/>

            <div className={styles.pageContent}>
                {children}
            </div>

            <Register control={{isRegister, setRegister, setLogin}}/>
            <Login control={{isLogin, setLogin, setRegister}}/>
        </>
    )
}


