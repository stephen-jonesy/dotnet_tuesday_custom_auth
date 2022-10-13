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
    const selectLoading = (state) => state.user.loading;
    const selectError = (state) => state.user.error;
    const selectMessage = (state) => state.user.message;

    const user = useSelector(selectUser);
    const isLoading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const message = useSelector(selectMessage);

    console.log(user);
    console.log("errors", error);

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
        dispatch(authenticateUser(userObj))
        .then((response)=>{
            console.log('from dispatch', response.meta.requestStatus);
      })
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

    const renderError = () => {
        if(error === true) {
            return (
            <div className="alert alert-danger" role="alert">
            {message}
          </div>)

        }
        if(error === false && message != null) {
            return (
                <div className="alert alert-success" role="alert">
                {message}
        </div>)}
        else {
            return;
        }
    };

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
        <div className="user-pages">
            {/* <button onClick={registerFunct}>register user</button> 
            <button onClick={loginFunt}>Login user</button> 
            <button onClick={getUsersFunt}>get all users</button>
            <button onClick={DeleteFunt}>Delete user</button> */}
            <div className="card" style={{width: "18rem"}}>
                <form className="p-4" onSubmit={loginFunt}>
                {renderError()}

                    <div className="w-100 d-flex justify-content-center">
                        <img src={tuesdayImage} className="p-3 mb-2 mt-0"/>

                    </div>

                    <div className="form-group mb-3">
                        <input type="username" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username"
                        value={username}   
                        onChange={(e) => {setUsername(e.target.value)}} 
                        required
                        ></input>
                    </div>
                    <div className="form-group mb-3">
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                        value={password}   
                        onChange={(e) => {setPassword(e.target.value)}} 
                        required
                        ></input>
                    </div>

                    <button  type="submit" className="btn w-100 mb-2" >{isLoading ? <div className="spinner-border text-light" role="status">
                    <span className="sr-only"></span>
                    </div> : "Submit" }</button>
                    <div className="d-flex justify-content-between"><p>Don't have a user yet? <a href="/register">Register</a></p></div>
                    
                </form>
            </div>
        </div>
    );
}

