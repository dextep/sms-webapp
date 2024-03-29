import './styles.css';
import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { Navbar, NavDropdown } from 'react-bootstrap';
import {setUserData} from "../../services/api";

class Navigationbar extends Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: ""
        };
    };

    componentDidMount() {
        if(localStorage.getItem("UserData") === null) {
            setUserData()
                .then(() => this.setUserTitle())
                .catch(() => this.logout())
        }else{
            this.setUserTitle()
        }
    }

    setUserTitle = () => {
        const userData = JSON.parse(localStorage.getItem("UserData"));
        this.setState({
            firstName: userData.firstName,
            lastName: userData.lastName
        })
    }

    logout = () => {
        const { history } = this.props;
        if(history)
        {
            localStorage.removeItem('UserData');
            localStorage.removeItem('JwtToken');
            history.push("/")
        }
    };

    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg" >
                <Navbar.Brand>Sport meeting system <span role="img" aria-label="running">🏃🏼</span></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <NavDropdown alignRight id="nav-dropdown" title={'Signed in as: '+this.state.firstName+' '+this.state.lastName}>
                        <NavDropdown.Item href="#">Profil</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={this.logout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Navbar>
        )
    }
};
export default withRouter(Navigationbar);