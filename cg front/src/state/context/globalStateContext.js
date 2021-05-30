import React, { useReducer,useEffect, createContext } from 'react';
import { globalStateReducer } from '../reducers/globalStateReducer';
import { cookiesSet, cookiesGet } from '../cookies'; 
// import {  } from '../../constants';

import config from '../../config';
import { useHttp } from '../../hooks/useHttp';

export const GlobalContext = createContext();

const GlobalStateContext = ({ children }) => {
    const { request, isLoading, isError } = useHttp();
    const [globalState, dispatch] = useReducer(globalStateReducer, {ready: false, errorInit: false, userData: null, });

    useEffect(() => {
      (async () => {
          const getUserId = await request(`${config.apiUrl}/auth/users/me/`, 'GET', null, {
            'Authorization':`Bearer ${cookiesGet()}`,
          });

          if(getUserId.ok){
          const getUserData = await request(`${config.apiUrl}/profile/${getUserId?.data?.id}`, 'GET', null, {
            'Authorization':`Bearer ${cookiesGet()}`,
          });
          
          if(getUserData.ok) dispatch({ type: 'SUCCESS_AUTH', data: getUserData.data, })
        }

        const sessions = await request(`${config.apiUrl}/session/`);
        if( sessions.ok ){
          const urls = sessions?.data?.map(item => request(`${config.apiUrl}/session/${item.id}/`)); 
          Promise.all(urls).then(
                responses => {
                  const sess = sessions.data.map( ( item,index ) => {
                    item.periods = responses[index].data
                    return item;
                  } );
                  dispatch({type:'SUCCESS_SESSION', data: sess});
                }
          )
        }

        const result = await request(`${config.apiUrl}/event-schedule/?format=json`);
        const {data, ok} = result;

        const teams = await request(`${config.apiUrl}/team/`);
        if(teams.ok) dispatch({type:'SUCCESS_TEAM', data: teams.data}) 
        
        const mentors = await request(`${config.apiUrl}/mentors/`);
        if(mentors.ok) dispatch({type:'SUCCESS_MENTORS', data: mentors.data})  
        
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
