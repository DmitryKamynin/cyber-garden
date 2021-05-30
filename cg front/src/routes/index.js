import React from 'react';
import { Switch } from 'react-router';
// import {BrowserRouter as Router } from 'react-router-dom';

import routes from '../constants/routes'; 

import PublicRouter from './PublicRouter';
import PrivateRouter from './PrivateRouter';
import MentorRouter from './MentorRouter';

import Cases from '../pages/Cases';
import AboutHackathon from '../pages/AboutHackathon';
import HackathonMap from '../pages/HackathonMap';
import Mentors from '../pages/Mentors';
import MyTeam from '../pages/user/MyTeam';
import Partners from '../pages/Partners';
import Schedule from '../pages/Schedule';
import StaticSchedule from '../pages/StaticSchedule';
import UserAccount from '../pages/user/UserAccount';

import Teams from '../pages/mentor/Teams';
import Session from '../pages/mentor/Session';


const AppRoutes = () => {

    return (
  
        <Switch>
            
            <PublicRouter exact path={routes.getCases()} component={Cases} />
            <PublicRouter exact path={routes.getAboutHackathon()} component={AboutHackathon} />
            <PublicRouter exact path={routes.getHackathonMap()} component={HackathonMap} />
            <PublicRouter exact path={routes.getMentors()} component={Mentors} />
            <PrivateRouter exact path={routes.getMyTeam()} component={MyTeam} />
            <PublicRouter exact path={routes.getPartners()} component={Partners} />
            <PublicRouter exact path={routes.getSchedule()} component={Schedule} />
            <PrivateRouter exact path={routes.getUserAccount()} component={UserAccount} />
            <PublicRouter exact path={'/StaticSchedule'} component={StaticSchedule} /> 

            <MentorRouter exact path={'/Teams'} component={Teams} />    
            <MentorRouter exact path={'/Session'} component={Session} />    
        </Switch>
 
    )
}  

export default AppRoutes
