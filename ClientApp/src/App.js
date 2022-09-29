import React, { Component, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Login } from './Auth/Login';
import { Register } from './Auth/Register';
import { Profile } from './Auth/Profile';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { getUser } from './Auth/userReducer';

import './custom.css'

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    let storedUser = localStorage.getItem("user");
    storedUser = JSON.parse(storedUser);
    dispatch(getUser(storedUser));
  }, []);

  return (
    <Layout>
      <Route exact path='/' component={Home} />
      <Route path='/counter' component={Counter} />
      <Route path='/fetch-data' component={FetchData} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/profile' component={Profile} />

    </Layout>
  );
  
}
