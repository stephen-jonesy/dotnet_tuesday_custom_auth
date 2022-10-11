import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import Cookies from 'js-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../Auth/userReducer';

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
    console.log("logout funct")
    dispatch(logoutUser());
  }

  return (
    <header className="header">
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
        <Container>
          <NavbarBrand tag={Link} to="/">DotnetTuesday</NavbarBrand>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/list">list</NavLink>
              </NavItem>
            </ul>
              {Auth ? (
              <ul className="navbar-nav flex-grow">

                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/profile">Profile</NavLink>
                </NavItem>
                <button onClick={() => logOutFunt()}>Logout</button>

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
