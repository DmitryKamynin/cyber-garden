import { Button } from '@material-ui/core';
import React from 'react'
import { Link } from 'react-router-dom';

import styles from '../styles/components/UserNavBar.module.css';

export default function UserNavBar() {
    return (
        <div className={styles.wrapper}>
            
            <Link to='/UserAccount'>
                <Button>
                    Анкета
                </Button>
            </Link>

            <Link to='/MyTeam'>
                <Button>
                    Моя команда
                </Button>
            </Link>

        </div>
    )
}
