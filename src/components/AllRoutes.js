import React, { Component, Redirect } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { PrivateRoute } from '../helpers/PrivateRouter'
import { history } from "../helpers/history";

import { Tabs, Tab } from 'react-bootstrap';

import Navigationbar from './Navbar';
import SignIn from './SignIn';
import Dashboard from '../components/Dashboard';
import SignUp from '../components/SignUp';

export class AllRoutes extends Component {

    render() {
        const LoginContainer = () => (
            <div className="container">
                <Tabs defaultActiveKey="SignIn">
                    <Tab eventKey="SignIn"  title="Sign In">
                        <SignIn/>
                    </Tab>
                    <Tab eventKey="SignUp" title="Sign Up">
                        <SignUp/>
                    </Tab>
                </Tabs>
            </div>
        );

        const DefaultContainer = () => (
            <div>
                <Navigationbar/>
                <Route path="/" component={Dashboard}/>
            </div>
        );

        const Page404 = ({location}) => (
            <div>
                <h2>No match found for <code>{location.pathname}</code></h2>
            </div>
        );
        return (
            <Router history={history}>
                <Switch>
                    <PrivateRoute exact path='/' component={DefaultContainer}/>
                    <Route path="/signIn" component={LoginContainer}/>
                    <Route component={Page404}/>
                </Switch>
            </Router>
        )

    }
}