import React, {Component} from 'react';
import {LeafletMap} from '../LeafletMap'
import MapSidebar from "../MapSidebar";
import Navigationbar from "../Navbar";
import {setUserData} from "../../services/api";
export class Dashboard extends Component {

    render() {
        return (
            <div>
                <LeafletMap/>
            </div>
        )
    }
};

export default Dashboard;
