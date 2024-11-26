import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Navbar,
    NavItem,
    NavbarToggler,
    Collapse,
    NavLink,
    Nav,
    NavbarBrand} from 'reactstrap';


const Menu = () => {
    return (
        <div className="  navbar-collapse " >
        <Navbar color="light" light expand="md">
        <NavbarBrand href="/"></NavbarBrand>
        <NavbarToggler />
        <Collapse navbar>
            <Nav className="mr-auto" navbar style={{margin: '0 auto'}}>
                
                <NavItem>
                    <NavLink href="/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/About">About</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/Cadastro">Cadastro</NavLink>
                </NavItem>
               
            </Nav>
        </Collapse>
        </Navbar>
    </div>
    )
}

export default Menu;
