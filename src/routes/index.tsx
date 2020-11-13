import React from 'react';
// Swtich: makes sure one route is showed at the time
// Route are the routes of application
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" exact component={SignUp} />

    <Route path="/dashboard" exact component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
