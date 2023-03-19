import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import style from './Header.module.css'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <Navbar expand="lg" id={style.Header}>
      <Container>
        <Navbar.Brand as={Link} to={"/"} className={style.NavItem}>
          Pokedex
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <NavDropdown title="Cerrar seción" id={style.NavDropdown}>
              <NavDropdown.Item href="#action/3.1" as={Link} to={"/"}>Salir</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
}

export default Header;
