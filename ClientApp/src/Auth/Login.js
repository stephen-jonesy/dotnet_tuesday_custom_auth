import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { authenticateUser } from './userReducer';
import { useSelector, useDispatch } from 'react-redux';

export function Login() {
  
    const dispatch = useDispatch();
    const selectUser = (state) => state.user.user;
    const user = useSelector(selectUser);
    console.log(user);

    // async function registerFunct() {

    //     const user = {
    //         "firstName": "Stephen",
    //         "lastName": "Jones",
    //         "username": "Jonesy",
    //         "password": "Jonesy12@"
    //     };
    //     const config = {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(user)
    //     }
    //     const data = await fetch('users/register', config);
    //     const json = await data.json()
    //     console.log(json);
    // }

    async function loginFunt() {
        dispatch(authenticateUser());

        // const user = {
        //     "username": "Jonesy",
        //     "password": "Jonesy12@"
        // };
        // const config = {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(user)
        // }
        // const data = await fetch('users/authenticate', config);
        // const json = await data.json();
        // Cookies.set("token", json.token); 

        // console.log(json);
    }

    async function getUsersFunt() {
        const token = Cookies.get("token");
        const response = await fetch(`users/`, {
                headers: !token ? {} : { 
                    'Authorization': `Bearer ${token}`
                }
            });
        const json = await response.json()
        console.log(json);
    }


    async function DeleteFunt() {
        const token = Cookies.get("token");

        const Id = 4
        const config = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }
        const data = await fetch(`users/${Id}`, config);
        const json = await data.json()
        console.log(json);
    }


    // useEffect(() => {
    //     loginFunt();
            
    // }, []);

    return (  
        <div>
            {/* <button onClick={registerFunct}>register user</button> */}
            <button onClick={loginFunt}>Login user</button>
            <button onClick={getUsersFunt}>get all users</button>
            <button onClick={DeleteFunt}>Delete user</button>

            login page
        </div>
    );
}

