import React, { useReducer,useEffect, createContext } from 'react';
import { globalStateReducer } from '../reducers/globalStateReducer';
// import {  } from '../../constants';

import config from '../../config';
import { useHttp } from '../../hooks/useHttp';

export const GlobalContext = createContext();

const GlobalStateContext = ({ children }) => {
    const { request, isLoading, isError } = useHttp();
    const [globalState, dispatch] = useReducer(globalStateReducer, {ready: false, errorInit: false, userData: null, });

    useEffect(() => {
      (async () => {
        const result = await request(`${config.apiUrl}/event-schedule/?format=json`);
        const {data, ok} = result;
        
        if(ok) dispatch({type:'SUCCESS_INIT_APP', schedule:data})
        else dispatch({type:'ERROR_INIT_APP',})
      })();
    }, [])

    return (
        <GlobalContext.Provider
          value={{
            globalState,
            dispatch,
          }}
        >
          {children}
        </GlobalContext.Provider>
    );
}

export default GlobalStateContext;
