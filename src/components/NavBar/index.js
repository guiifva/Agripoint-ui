import React from 'react';

import {} from './styles';
import { Navbar, Nav } from 'react-bootstrap';

export default function NavBar() {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/Home">Educapoint</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/Home">Home</Nav.Link>
                <Nav.Link href="/SubscriptionPlans">Planos</Nav.Link>
                <Nav.Link href="/Reports">Relatorios</Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link href="/Logout">Logout</Nav.Link>
            </Nav>
        </Navbar>
    );
}
