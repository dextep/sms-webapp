import {Link} from "react-router-dom";
import './styles.css';
import React, { Component } from "react";
import axios from "axios";
import { withRouter } from 'react-router-dom';
import { Navbar, NavItem, NavDropdown, MenuItem, Nav } from 'react-bootstrap';

class Navigationbar extends Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: ""
        }
    };

    componentDidMount() {
        axios.get('http://localhost:8080/profile')
            .then( response => {
                console.log(response)
                this.setState({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName
                })
            })
    }

    logout = () => {
        const { history } = this.props;
        if(history)
        {
            localStorage.removeItem('JwtToken');
            history.push("/")
        }
    };

    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg" >
                <Navbar.Brand>Navbar with text</Navbar.Brand>
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