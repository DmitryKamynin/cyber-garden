import React, { useContext } from 'react';

import {GlobalContext} from '../state/context/globalStateContext';

import {useHttp} from '../hooks/useHttp';

import NavBar from '../components/NavBar'

import styles from '../styles/pages/Main.module.css';

export default function Main() {
    const { request } = useHttp();
    const { GlobalState, dispatch } = useContext(GlobalContext);

    return (
        <div className={styles.wrapper}>
            Main page
            <NavBar/>
        </div>
    )
}

