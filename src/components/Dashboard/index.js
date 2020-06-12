import React, {Component} from 'react';
import {LeafletMap} from '../LeafletMap';
export class Dashboard extends Component {

    render() {
        return (
            <div>
                <LeafletMap/>
            </div>
        )
    }
}

export default Dashboard;
