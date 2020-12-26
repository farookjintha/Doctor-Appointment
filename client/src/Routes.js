import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SignIn from './user/SignIn';
import Dashboard from './core/Dashboard';
import Appointment from './core/Appointment';


const Routes = () =>{
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={SignIn} />
                <Route path="/doctor/dashboard" exact component={Dashboard}/>
                <Route path="/doctor/appointments" exact component={Appointment}/>
                
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;