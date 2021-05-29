import { useState } from 'react';
import config from '../config';
import { cookiesGet } from '../state/cookies'; 
import { useHttp } from './useHttp';

export default function useTgCode() {
    const { request } = useHttp();
    const [code, setCode] = useState(null);

    const getTgCode = async () => {
        const result = await request(`${config.apiUrl}/create-code/`, 'GET', null, {
            'Authorization':`Bearer ${cookiesGet()}`,
        });

        const { data, ok } = result;

        if(ok) setCode(data.code);
    };
        
    return {
        code,
        getTgCode,
    }
}
