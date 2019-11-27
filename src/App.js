import React, { Component } from 'react';
import './App.css';
import {AllRoutes} from './components/AllRoutes'
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

export class App extends Component {

    render() {
        return (
            <div>
                <AllRoutes/>
            </div>
        );
    }

}

export default App;

