import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.css';

class Footer extends Component {
    render() {
        return(
            
            <Navbar fixedBottom>
                    <Navbar.Text>Ramen company ltd.</Navbar.Text>
            </Navbar>
        );
    }
}

export default Footer;
