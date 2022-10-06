import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { authenticateUser } from './userReducer';
import { useSelector, useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    useHistory,
} from "react-router-dom";
import tuesdayImage from '../images/Tuesday.svg';

export function Login() {
    const history = useHistory()

    const dispatch = useDispatch();
    const selectUser = (state) => state.user.user;
    const user = useSelector(selectUser);
    console.log(user);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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

    async function loginFunt(e) {
        e.preventDefault();        

        const userObj = {
            username: username,
            password: password,

        };
        dispatch(authenticateUser(userObj));

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

        history.push("/");
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

    // const addProjectButton = () => {
    //     const projectObj = {
    //         username: username,
    //         password: password

    //     };

    //     dispatch(authenticateUser(projectObj));

    // };  

    return (  
        <div>
            {/* <button onClick={registerFunct}>register user</button> */}
            {/* <button onClick={loginFunt}>Login user</button> */}
            <button onClick={getUsersFunt}>get all users</button>
            <button onClick={DeleteFunt}>Delete user</button>

            login page

            <div className="card" style={{width: "18rem"}}>
                <form className="p-4" onSubmit={loginFunt}>
                    <div className="w-100 d-flex justify-content-center">
                        <img src={tuesdayImage} className="p-3 mb-2 mt-0"/>

                    </div>

                    <div className="form-group mb-3">
                        <input type="username" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username"
                        value={username}   
                        onChange={(e) => {setUsername(e.target.value)}} 
                        ></input>
                    </div>
                    <div className="form-group mb-3">
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                        value={password}   
                        onChange={(e) => {setPassword(e.target.value)}} 
                        ></input>
                    </div>

                    <button  type="submit" className="btn btn-primary w-100 mb-2" >Submit</button>
                    <div className="d-flex justify-content-between"><a>Forgot your password?</a><a>Register</a></div>
                    
                </form>
            </div>
        </div>
    );
}

