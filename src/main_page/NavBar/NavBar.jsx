import React, { Component, } from 'react';
import { Navbar, Nav, NavItem, } from 'react-bootstrap';
import { Link, } from 'react-router-dom';
import './NavBar.css';

class NavPan extends Component {
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to='/'>Home</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavItem eventKey={1} componentClass={Link} href='/' to='/'>Home</NavItem>
                        <NavItem eventKey={2} componentClass={Link} href='/webm' to='/webm' >Webm</NavItem>
                        <NavItem eventKey={3} componentClass={Link} href='/res' to='/res'>Resources</NavItem>
                        <NavItem eventKey={4} componentClass={Link} href='/test' to='/test'>addLink</NavItem>
                        <NavItem eventKey={5} componentClass={Link} href='/music' to='/music'>Music</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
export default NavPan;
