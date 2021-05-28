// import { Backdrop, CircularProgress } from '@material-ui/core';
import React, {useContext} from 'react';

import AppRoutes from './routes';
import {GlobalContext} from './state/context/globalStateContext';

function App() {
  const { GlobalState } = useContext(GlobalContext);

  return (
    <>
      {/* {GlobalState.ready ?
          <AppRoutes /> 
          : 
          <Backdrop style={{color: '#fff', zIndex: '9999'}} open>
            <CircularProgress color="primary" />
          </Backdrop> 
       } */}
       <AppRoutes /> 
    </>
  );
}

export default App;

