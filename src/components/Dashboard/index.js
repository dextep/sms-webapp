import React, {Component} from 'react';
import {LeafletMap} from '../LeafletMap'
import MapSidebar from "../MapSidebar";
import Navigationbar from "../Navbar";

export class Dashboard extends Component {

    render() {
        return (
            <div>
                <h1>Dashboard Page</h1>
                <LeafletMap/>
            </div>
        )
    }
};

export default Dashboard;
