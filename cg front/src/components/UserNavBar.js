import { Button } from '@material-ui/core';
import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

import styles from '../styles/components/UserNavBar.module.css';

export default function UserNavBar() {
    const { logoutHandler } = useAuth();
    const location = useLocation();
    return (
        <div className={styles.wrapper}>
            
            <Link to='/UserAccount'>
                <Button
                    classes={ location.pathname === '/UserAccount' ? {
                        root: styles.btn,
                    }: {
                        root: styles.innactivBtn,
                    }}
                >
                    Анкета
                </Button>
            </Link>

            <Link to='/MyTeam'>
                <Button
                    classes={ location.pathname === '/MyTeam' ? {
                        root: styles.btn,
                    }: {
                        root: styles.innactivBtn,
                    }}
                >
                    Моя команда
                </Button>
            </Link>

            <Button style={{flex: '1 1 100%'}} onClick={logoutHandler}>
                    Выйти
            </Button>

        </div>
    )
}
