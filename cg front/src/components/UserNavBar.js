import { Button } from '@material-ui/core';
import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

import {GlobalContext} from 'state/context/globalStateContext';

import styles from '../styles/components/UserNavBar.module.css';

export default function UserNavBar() {
    const { globalState } = useContext(GlobalContext);

    const { logoutHandler } = useAuth();
    const location = useLocation();
    const { userData } = globalState;
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
            {!(userData?.role === 'Ментор') ? 
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
            </Link> : null
                }

            

            <Button style={{flex: '1 1 100%'}} onClick={logoutHandler}>
                    Выйти
            </Button>

        </div>
    )
}
