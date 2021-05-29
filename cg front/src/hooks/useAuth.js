import React, { useState, useContext } from 'react';
import {GlobalContext} from '../state/context/globalStateContext';
import config from '../config';

import { useHttp } from './useHttp';

export default function useAuth() {
    const { dispatch } = useContext(GlobalContext);
    const { request } = useHttp();

    const [isError, setError] = useState(false)

    const handleAuth = async (values, handler) => {
        if(handler === 'register'){
            const result = await request(`${config.apiUrl}/auth/users`, 'POST', values);
            const {data, ok, error} = result;
            if(ok) dispatch({ type: 'SUCCES_REGISTER' })
            else setError(error)
        }
        if(handler === 'login'){
            const result = await request(`${config.apiUrl}/auth/`, 'POST', values);
            const {data, ok, error} = result;
            if(ok) dispatch({ type: 'SUCCES_LOGIN', data, })
            else setError(error)
        }
    };

    const registerHandler = async ( values ) => { await  handleAuth(values, 'register') };
    const loginHandler = async ( values ) => { await  handleAuth(values, 'login') };

    return {
        isError,
        registerHandler,
        loginHandler,
    }
}
