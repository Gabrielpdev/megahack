import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import Commerce from '../pages/Commerce';
import Profile from '../pages/Profile';
import History from '../pages/Profile/History';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/dashboard" component={Dashboard} isPrivate />

    <Route path="/profile" exact component={Profile} isPrivate />
    <Route path="/profile/history" component={History} isPrivate />

    <Route path="/commerce/:id" component={Commerce} isPrivate />
  </Switch>
);

export default Routes;
