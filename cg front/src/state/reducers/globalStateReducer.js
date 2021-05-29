// import {  } from '../../constants' 

export const globalStateReducer = (currentState, { type, data, schedule }) => {
    switch (type) {
        case 'SUCCES_REGISTER':
            return {
                ...currentState,
                userData: data,
            }
        case 'SUCCES_REGISTER':
            return {
                ...currentState,    
            }
        case 'SUCCESS_INIT_APP':
            return {
                ...currentState,
                schedule,
                ready: true,
            }
        case 'ERROR_INIT_APP':
            return {
                ...currentState,
                ready: true,
                errorInit: true,
            }
        default:
          throw new Error('Error in Reducer');
    }
}