import React from 'react';
import { Switch } from 'react-router';
// import {BrowserRouter as Router } from 'react-router-dom';

import routes from '../constants/routes'; 

import PublicRouter from './PublicRouter';

import Main from '../pages/Main'

const AppRoutes = () => {

    return (
  
            <Switch>
                <PublicRouter exact path={routes.getMain()} component={Main} />
            </Switch>
 
    )
}  

export default AppRoutes