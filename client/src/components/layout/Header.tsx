import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav, Form } from 'react-bootstrap';
import logo from '../../logo.jpg';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaRegUser } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';



const Header = () => {
    return (
        <div>
            <Container>
                <Navbar bg="none" variant="light" style={{zIndex: 1}}>
                    <Navbar>
                        <Link className="navbar-brand text-dark" to="/">
                            <img
                                alt="vegan foods nepal"
                                src={logo}
                                width="90"
                                height="90"
                                className="d-inline-block align-top"
                            /></Link>
                    </Navbar>
                    <Nav className="mr-auto">
                        <Link className="nav nav-link text-dark" to="/">Home</Link>
                        <Link className="nav nav-link text-dark" to="/products">Products</Link>
                        <Link className="nav nav-link text-dark" to="/recipes">Recipes</Link>
                    </Nav>
                    <Form inline>
                        <Link to="/profile" className="mx-2 text-dark">
                            <FaRegUser />
                        </Link>

                        <Link to="/search" className="mx-2 text-dark">
                            <FiSearch />
                        </Link>

                        <Link to="/cart" className="mx-2 text-dark">
                            <AiOutlineShoppingCart />
                            <span className="badge badge-pill badge-success" style={{ 
                                fontSize: '10px',
                                position: 'absolute',
                                color: '#fff',
                                backgroundColor: '#87a287'
                            }}> 3 </span>
                        </Link>
                    </Form>
                </Navbar>
            </Container>
        </div >
    )
}

export default Header