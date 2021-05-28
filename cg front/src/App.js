// import { Backdrop, CircularProgress } from '@material-ui/core';
import { Backdrop, CircularProgress } from '@material-ui/core';
import React, {useContext} from 'react';

import AppRoutes from './routes';
import {GlobalContext} from './state/context/globalStateContext';

function App() {
  const { globalState } = useContext(GlobalContext);

  return (
    <>
      {globalState.errorInit ?
          <div>
            Произошло что то очень плохое :( Разработчики уже работают над этим...
          </div> :
            
          globalState.ready ?

          <AppRoutes />
          : 
          <Backdrop style={{color: '#fff', zIndex: '9999'}} open>
            <CircularProgress color="primary" />
          </Backdrop> 
       }
    </>
  );
}

export default App;

