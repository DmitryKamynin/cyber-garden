import React, { useReducer,useEffect, createContext } from 'react';
import { globalStateReducer } from '../reducers/globalStateReducer';
// import {  } from '../../constants';

import { useHttp } from '../../hooks/useHttp';

export const GlobalContext = createContext();

const GlobalStateContext = ({ children }) => {
    const { request } = useHttp();
    const [GlobalState, dispatch] = useReducer(globalStateReducer, {ready: false});

    return (
        <GlobalContext.Provider
          value={{
            GlobalState,
            dispatch,
          }}
        >
          {children}
        </GlobalContext.Provider>
    );
}

export default GlobalStateContext;
