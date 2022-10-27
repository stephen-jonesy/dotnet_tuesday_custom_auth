import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../Auth/userReducer';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export function NavUser() {
  const dispatch = useDispatch();

  const selectUser = (state) => state.user.user;

  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const user = useSelector(selectUser);

  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  const logOutFunt = () => {
    dispatch(logoutUser());
  };

  const userDisplay = () => {
    const username = user.username;
    let initial = username.charAt().toUpperCase();
    return initial;
  }

  return (
    <div ref={ref}>
      <Button onClick={handleClick}>{userDisplay()}</Button>

      <Overlay
        show={show}
        target={target}
        placement="bottom"
        container={ref}
        containerPadding={20}
      >
        <Popover id="popover-contained">
          <Popover.Header as="h3">Popover bottom</Popover.Header>
          <Popover.Body>
          {/* <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/profile">Profile</NavLink>
          </NavItem> */}
          <button onClick={() => logOutFunt()}>Logout</button>

          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
}

