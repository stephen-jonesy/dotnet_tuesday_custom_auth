import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import Cookies from 'js-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../Auth/userReducer';
import logo from '../images/Tuesday.svg'; // Tell webpack this JS file uses this image
import mobileLogo from '../images/Tue.svg'; // Tell webpack this JS file uses this image
import { BoxArrowRight} from "react-bootstrap-icons";

export function NavMenu () {
  const dispatch = useDispatch();

  const selectAuthState = (state) => state.user.auth;
  const Auth = useSelector(selectAuthState);

  // static displayName = NavMenu.name;

  // constructor (props) {
  //   super(props);

  //   this.toggleNavbar = this.toggleNavbar.bind(this);
  //   this.state = {
  //     collapsed: true
  //   };
  // }

  // toggleNavbar () {
  //   this.setState({
  //     collapsed: !this.state.collapsed
  //   });
  // }

  const logOutFunt = () => {
    dispatch(logoutUser());
  }

  return (
    <header className="header">
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
        <Container>
          <NavbarBrand tag={Link} to="/">
              <img src={logo} alt="Logo" className="d-lg-block d-none" />
              <img src={mobileLogo} alt="mobile Logo" className="d-lg-none" ></img>
          </NavbarBrand>
            <ul className="navbar-nav flex-grow">
              {/* <NavItem>
                <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/list">list</NavLink>
              </NavItem> */}
            </ul>
              {Auth ? (
              <ul className="navbar-nav flex-grow">

                {/* <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/profile">Profile</NavLink>
                </NavItem> */}
                <button onClick={() => logOutFunt()}>< BoxArrowRight />  Logout</button>

              </ul>
              ) : (
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/register">Register</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/login">Login</NavLink>
                </NavItem>

              </ul>

              )}
        </Container>
      </Navbar>
    </header>
  );

}
