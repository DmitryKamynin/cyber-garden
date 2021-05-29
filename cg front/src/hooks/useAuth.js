import { useState, useContext } from 'react';
import {GlobalContext} from '../state/context/globalStateContext';
import config from '../config';

import { useHttp } from './useHttp';

export default function useAuth() {
    const { dispatch } = useContext(GlobalContext);
    const { request } = useHttp();

    const [isError, setError] = useState(false)

    const handleAuth = async (values, handler) => {
        values.username = values.username.replace(/(\(|\))/gi, '');

        if(handler === 'register'){
            const result = await request(`${config.apiUrl}/auth/users/`, 'POST', values);
            const {data, ok, error} = result;
            if(ok) dispatch({ type: 'SUCCES_REGISTER' })
            else setError(error)
        }
        if(handler === 'login'){
            const create = await request(`${config.apiUrl}/auth/jwt/create/`, 'POST', values);

            if(create.ok){
                const result = await request(`${config.apiUrl}/auth/users/me/`, 'GET', null, {
                    'Authorization':`Bearer ${create.data.access}`,
                });
                const { data, ok, error } = result;
                if(ok) dispatch({ type: 'SUCCESS_LOGIN', data, })
                else setError(error)
            }
            else setError(create.error)
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
