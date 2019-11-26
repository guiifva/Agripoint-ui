import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Order from './pages/Order';
import Main from './pages/Main';
import Reports from './pages/Reports';

import { isAuthenticated, logout } from './services/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{ pathname: '/', state: { from: props.location } }}
                />
            )
        }
    />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/SubscriptionPlans" component={Main} />
            <PrivateRoute path="/Home" component={Home} />
            <PrivateRoute path="/Reports" component={Reports} />
            <PrivateRoute path="/Logout" component={SignIn} />

            <PrivateRoute
                path="/Order/:subscriptionPlansId"
                component={Order}
            />
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes;
