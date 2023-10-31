import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavItem, NavLink, Navbar } from 'reactstrap';
class HeaderComponent extends Component {
    state = {  } 
    render() { 
        return (           
                <Navbar color='light' light expand="md">
                      <Nav className="me-auto" navbar>
                            <NavItem>
                                <NavLink tag={Link} to="/" >Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/add">Add Inventory</NavLink>
                            </NavItem>
                        </Nav>                            

                </Navbar>               
        
        );
    }
}
 
export default HeaderComponent;