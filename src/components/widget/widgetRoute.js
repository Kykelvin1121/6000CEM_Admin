// routes.js
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Home'; // Import your Home or Dashboard component
import AllSales from './AllSales'; // Import your All Sales component
import AllOrders from './AllOrders'; // Import your All Orders component
import AllEarnings from './AllEarnings'; // Import your All Earnings component
import AllUsers from './AllUsers'; // Import your All Users component

const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/orders" component={AllOrders} />
            <Route path="/users" component={AllUsers} />
        </Switch>
    );
};

export default Routes;
