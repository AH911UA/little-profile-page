import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const AppNavbar = (props) => {

    const isLogin = props.isLogin;

    return (
        <Navbar bg="light" expand="lg">
            <Link to='/'>
                <Navbar.Brand href="#home">Sod's Law</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                     
                { 
                    isLogin ? 
                    <>
                        <Link to='/profile'>
                            <Nav.Link href="#profile"> profile </Nav.Link>
                        </Link>
                        <Link to='/news'> 
                            <Nav.Link href="#news"> news </Nav.Link>
                        </Link>
                    </>
                    : ""        
                }
 
                {/* <Nav.Link href="#link">Link</Nav.Link> */}
                {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown> */}
                </Nav>
                <Form onSubmit={props.onNavSingInOut}>
                    <Button variant="outline-warning" type="submit">
                        {  props.isLogin ? "sing out" : "sing in"}
                    </Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}


export default AppNavbar;