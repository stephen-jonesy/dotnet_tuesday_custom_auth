import React, { Component, useEffect } from 'react';
import './App.scss';

import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Login } from './Auth/Login';
import { Register } from './Auth/Register';
import { Profile } from './Auth/Profile';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { getUser } from './Auth/userReducer';
import { List } from './components/list/List';

import './custom.css'

export function App() {
  const dispatch = useDispatch();
  const selectAuthState = (state) => state.user.auth;
  const Auth = useSelector(selectAuthState);
  console.log(Auth);
  useEffect(() => {
    let storedUser = sessionStorage.getItem("user");
    storedUser = JSON.parse(storedUser);
    console.log(storedUser);
    if(storedUser != null) {
      dispatch(getUser(storedUser));

    }
  }, []);

  return (
    <Layout>
      <RedirectAuthRoute path="/" isAuth={Auth}>
        <Home />
      </RedirectAuthRoute>
      <Route path='/counter' component={Counter} />
      <PrivateRoute path="/fetch-data" isAuth={Auth}>
        <FetchData />
      </PrivateRoute>
      <PrivateRoute path="/list" isAuth={Auth}>
        <List />
      </PrivateRoute>
      {/* <Route path='/fetch-data' component={FetchData} /> */}
      <RedirectAuthRoute path="/login" isAuth={Auth}>
        <Login />
      </RedirectAuthRoute>
      <RedirectAuthRoute path="/register" isAuth={Auth}>
        <Register />
      </RedirectAuthRoute>
      <Route path='/profile' component={Profile} />
      {/* <Route path='/list' component={List} /> */}

    </Layout>
  );
  
}

function PrivateRoute({ children, ...rest }) {
  let auth = rest.isAuth;
  console.log(rest);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
  );
};

function RedirectAuthRoute({ children, ...rest }) {
  let auth = rest.isAuth;
  console.log(rest);
  return (
    <Route exact
      {...rest}
      render={({ location }) =>
        !auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/list",
            }}
          />
        )
      }
    />
  );
};