import React, { useContext } from 'react';
import config from '../config';
import {GlobalContext} from 'state/context/globalStateContext';
import { useHttp } from './useHttp';

export default function useSession() {
    const { dispatch, globalState } = useContext(GlobalContext);
    const { request } = useHttp();

    const { sessions } = globalState;
    
    const changeSession = async (request) => {
      const changedSessions = sessions.map(session => {
        const changedPeriods = session.periods.map(period => {
          if(period.id === request.id) return request;
          return period; 
        })
        session.periods = changedPeriods;
        return session;
      })

      await dispatch({type:'SUCCESS_SESSION', data: changedSessions})
    }

    const refreshSession = async () => {
 
        const sessions = await request(`${config.apiUrl}/session/`);
        const urls = sessions.data.map(item => request(`${config.apiUrl}/session/${item.id}/`)); 
          Promise.all(urls).then(
                responses => {
                  const sess = sessions.data.map( ( item,index ) => {
                    item.periods = responses[index].data
                    return item;
                  } );
                  dispatch({type:'SUCCESS_SESSION', data: sess});
                }
        )

    };

    const handleAccess = async (row) => {
      const body = {
        id_session_id: row.session, 
        success_status: true,
      }
      const sessions = await request(`${config.apiUrl}/period/${row.period}/`, 'PUT', body);
      const { ok, data } = sessions
      if(ok) changeSession(data);
    }

    const handleDenided = async (row) => {
      const body = {
        id_session_id: row.session,
        success_status: false,
        free_status: true,
        comment_team:'',
        id_team_id: null,
      }
      const sessions = await request(`${config.apiUrl}/period/${row.period}/`, 'PUT', body);
      const { ok, data } = sessions
      if(ok) changeSession(data);
    }

    const handleMentorComment = async (row, valueSlider, valueComment) => {
      const body = {
        id_session_id: row.session,
        comment_mentor: valueComment,
        mentor_assessment: valueSlider,
      }
      const sessions = await request(`${config.apiUrl}/period/${row.period}/`, 'PUT', body);
      const { ok, data } = sessions
      if(ok) changeSession(data);
    }

    const handleRequestPeriod = async (row, valueComment, userData) => {
      const body = {
        id_session_id: row.session,
        free_status: false,
        id_team_id: userData?.team?.id,
        comment_team: valueComment,
      };
      const sessions = await request(`${config.apiUrl}/period/${row.period}/`, 'PUT', body);
      const { ok, data } = sessions
      if(ok) changeSession(data);
    }
        
    return {
      refreshSession,
      handleAccess,
      handleDenided,
      handleMentorComment,
      handleRequestPeriod,
    }
}
