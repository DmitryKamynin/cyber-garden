import React, { useContext } from 'react';

import {GlobalContext} from 'state/context/globalStateContext';

import {useHttp} from 'hooks/useHttp';

import Tamplate from 'components/Tamplate'

import styles from 'styles/pages/Main.module.css';

export default function Teams() {
    const { request } = useHttp();
    const { globalState, dispatch } = useContext(GlobalContext);

    return (
        <>
            <Tamplate>
                Teams
            </Tamplate>
        </>
    )
}

