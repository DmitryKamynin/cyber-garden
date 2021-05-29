import { useState, useContext } from 'react';
import {GlobalContext} from '../state/context/globalStateContext';
import config from '../config';
import { cookiesSet, cookiesGet, cookiesClear } from '../state/cookies'; 
import { useHttp } from './useHttp';

export default function useAuth() {
    const { dispatch, globalState } = useContext(GlobalContext);
    const { request } = useHttp();


    const handleAuth = async (values, handler) => {
        if(values?.username) values.username = values?.username?.replace(/(\(|\))/gi, '');

        if(handler === 'register'){
            const result = await request(`${config.apiUrl}/auth/users/`, 'POST', values);
            const {data, ok} = result;
            return { ok, data }
        }

        if(handler === 'login'){
            const create = await request(`${config.apiUrl}/auth/jwt/create/`, 'POST', values);

            if(create.ok){
                cookiesSet(create.data.access);

                const getUserId = await request(`${config.apiUrl}/auth/users/me/`, 'GET', null, {
                    'Authorization':`Bearer ${create.data.access}`,
                });

                const getUserData = await request(`${config.apiUrl}/profile/${getUserId.data.id}`, 'GET', null, {
                    'Authorization':`Bearer ${create.data.access}`,
                });
                
                if(getUserData.ok) dispatch({ type: 'SUCCESS_AUTH', data: getUserData.data, })

                return { ok: getUserData.ok, data: getUserData.data }
            }
            return { ok: create.ok, data: create.data }
        }

        if(handler === 'change'){
                const putUserData = await request(`${config.apiUrl}/profile/${globalState.userData.id}`, 'PUT', values, {
                    'Authorization':`Bearer ${cookiesGet()}`,
                });
                
                if(putUserData.ok) dispatch({ type: 'SUCCESS_AUTH', data: putUserData.data, })

                return { ok: putUserData.ok, data: putUserData.data }
            }

        if(handler === 'logout'){
            cookiesClear();
            dispatch({type:'LOGOUT'});
        };
    };
        

    const registerHandler = async ( values ) => await handleAuth(values, 'register');
    const loginHandler = async ( values ) => await handleAuth(values, 'login');
    const changeHandler = async ( values ) => await handleAuth(values, 'change');
    const logoutHandler = async () => await handleAuth(null, 'logout');

    return {
        registerHandler,
        loginHandler,
        changeHandler,
        logoutHandler,
    }
}
