export const globalStateReducer = (currentState, { type, data, schedule }) => {
    switch (type) {
        case 'SUCCESS_MENTORS':
            return {
                ...currentState,
                mentors: data,
            }
        case 'SUCCESS_SESSION':
            return {
                ...currentState,
                sessions: data,
            }
        case 'SUCCESS_TEAM':
            return {
                ...currentState,
                teams: data,
            }
        case 'LOGOUT':
            return {
                ...currentState,
                userData:null,
            }
        case 'SUCCESS_AUTH':
            return {
                ...currentState,
                userData: data,
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