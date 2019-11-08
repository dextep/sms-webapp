import React, {Component} from 'react';

export class Dashboard extends Component {

    logout = () => {
        localStorage.removeItem('JwtToken');
        this.props.history.push('/signIn');
    };

    render() {
        return (
            <div>
                <h1>Dashboard Page</h1>
            </div>
        )
    }
};

export default Dashboard;
