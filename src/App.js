import React from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import ValidatedLoginForm from './components/LoginForm'
import Login from './components/LoginForm/index';
import Dashboard from './components/Dashboard/index';
import {setAuthToken} from "./helpers/setAuthToken";

function App() {


    // if(localStorage.JwtToken){
    //     setAuthToken(localStorage.JwtToken)
    //     history.push('/dashboard');
    // }

  return (
      <div className="app-routes">
          <Switch>
              <Route path="/login" component={Login} />
              <Route path="/dashboard" component={Dashboard} />
          </Switch>
      </div>
    // <div className="App">
    //     <ValidatedLoginForm/>
    // </div>
  );
}

export default App;
