import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export default class Navi extends Component {
    render() {
        if (this.props.options[0].title) {
            return (
                <Navbar fixedBottom>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href='/'>Chews Food!</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            {this.props.options.map((opt, i) => {
                                return (
                                    <NavItem key={`item ${i}`} href={opt.link}>{opt.title}</NavItem>
                                )
                            })}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            )
    } else {
            return (
                <Navbar fixedBottom>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href='/'>Chews Food!</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                </Navbar>
            )
    }
    }
}