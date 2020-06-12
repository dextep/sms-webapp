import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { PrivateRoute } from '../helpers/PrivateRouter'
import { history } from "../helpers/history";
import './styles.css';
import { Tabs, Tab } from 'react-bootstrap';

import Navigationbar from './Navbar';
import SignIn from './SignIn';
import Dashboard from '../components/Dashboard';
import SignUp from '../components/SignUp';

export class AllRoutes extends Component {

    render() {
        const LoginContainer = () => (
            <div className="headerContainer">
                <div className="page-wrap">
                    <Tabs defaultActiveKey="SignIn" className={"nav-justified"}>
                        <Tab eventKey="SignIn"  title="Sign In">
                            <Route path="/signIn" component={SignIn}/>
                        </Tab>
                        <Tab eventKey="SignUp" title="Sign Up">
                            <Route path="/" component={SignUp}/>
                        </Tab>
                    </Tabs>
                </div>
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
            <BrowserRouter history={history}>
                <Switch>
                    <PrivateRoute exact path='/' component={DefaultContainer}/>
                    <Route path='/signIn' component={LoginContainer}/>
                    <Route component={Page404}/>
                </Switch>
            </BrowserRouter>
        )

    }
}