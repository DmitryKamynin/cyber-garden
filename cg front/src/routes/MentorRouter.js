import React, {useContext} from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import {GlobalContext} from '../state/context/globalStateContext';

const PublicRoute = ({ component: Component, ...rest }) => {
    const { globalState } = useContext(GlobalContext);
    return (
      <Route
        exact={rest.exact}
        computedMatch={rest.computedMatch}
        path={rest.path}
        url={rest.url}
        render={() => <Component />}
      >
        {/* {!globalState.userData.role === 'Ментор' && <Redirect to='/'/>} */}
    </Route>
    );
};
export default PublicRoute;
