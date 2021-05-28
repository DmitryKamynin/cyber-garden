import React from 'react';
import { Switch } from 'react-router';
// import {BrowserRouter as Router } from 'react-router-dom';

import routes from '../constants/routes'; 

import PublicRouter from './PublicRouter';


import Cases from '../pages/Cases'
import AboutHackathon from '../pages/AboutHackathon';
import HackathonMap from '../pages/HackathonMap'
import Mentors from '../pages/Mentors'
import MyTeam from '../pages/MyTeam'
import Partners from '../pages/Partners'
import Schedule from '../pages/Schedule'
import UserAccount from '../pages/UserAccount'


const AppRoutes = () => {

    return (
  
        <Switch>
            
            <PublicRouter exact path={routes.getCases()} component={Cases} />
            <PublicRouter exact path={routes.getAboutHackathon()} component={AboutHackathon} />
            <PublicRouter exact path={routes.getHackathonMap()} component={HackathonMap} />
            <PublicRouter exact path={routes.getMentors()} component={Mentors} />
            <PublicRouter exact path={routes.getMyTeam()} component={MyTeam} />
            <PublicRouter exact path={routes.getPartners()} component={Partners} />
            <PublicRouter exact path={routes.getSchedule()} component={Schedule} />
            <PublicRouter exact path={routes.getUserAccount()} component={UserAccount} />
            
        </Switch>
 
    )
}  

export default AppRoutes
