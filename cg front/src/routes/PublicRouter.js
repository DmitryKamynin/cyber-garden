import React from 'react';
import { Route } from 'react-router-dom';

const PublicRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        exact={rest.exact}
        computedMatch={rest.computedMatch}
        path={rest.path}
        url={rest.url}
        render={() => <Component />}
      />
    );
};
export default PublicRoute;
