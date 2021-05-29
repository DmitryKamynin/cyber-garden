import { useState, useContext } from 'react';
import {GlobalContext} from '../state/context/globalStateContext';
import config from '../config';

import { useHttp } from './useHttp';

export default function useAuth() {
    const { dispatch } = useContext(GlobalContext);
    const { request } = useHttp();

    const handleAuth = async (values, handler) => {
        values.username = values.username.replace(/(\(|\))/gi, '');

        if(handler === 'register'){
            const result = await request(`${config.apiUrl}/auth/users/`, 'POST', values);
            const {data, ok} = result;
            if(ok) dispatch({ type: 'SUCCESS_REGISTER' });

            return { ok, data }
        }
        if(handler === 'login'){
            const create = await request(`${config.apiUrl}/auth/jwt/create/`, 'POST', values);

            if(create.ok){
                const getUserId = await request(`${config.apiUrl}/auth/users/me/`, 'GET', null, {
                    'Authorization':`Bearer ${create.data.access}`,
                });

                const getUserData = await request(`${config.apiUrl}/profile/${getUserId.data.id}`, 'GET', null, {
                    'Authorization':`Bearer ${create.data.access}`,
                });
                
                if(getUserData.ok) dispatch({ type: 'SUCCESS_LOGIN', data: getUserData.data, })

                return { ok: getUserData.ok, data: getUserData.data }
            }
            return { ok: create.ok, data: create.data }
        }
    };

    const registerHandler = async ( values ) => await handleAuth(values, 'register') ;
    const loginHandler = async ( values ) => await handleAuth(values, 'login') ;

    return {
        registerHandler,
        loginHandler,
    }
}
