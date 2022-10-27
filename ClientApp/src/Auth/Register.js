import React, { useState, useEffect } from 'react';
import { registerUser } from './userReducer';
import { useSelector, useDispatch } from 'react-redux';
import tuesdayImage from '../images/Tuesday.svg';
import {
    useHistory
} from "react-router-dom";

export function Register () {
    const dispatch = useDispatch();
    const history = useHistory()
    const selectError = (state) => state.user.error;
    const selectMessage = (state) => state.user.message;
    const error = useSelector(selectError);
    const message = useSelector(selectMessage);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    async function registerFunct(e) {
        e.preventDefault();        

        const userObj = {
            firstname: firstname,
            lastname: lastname,
            username: username,
            password: password,

        };
        dispatch(registerUser(userObj))        
        .then((response)=>{
            if (response.meta.requestStatus != "rejected") {
                history.push("/login");

            }
      })
        // history.push("/login");

    }

    const renderError = () => {
        if(error === true) {
            return (
            <div className="alert alert-danger" role="alert">
            {message}
          </div>)

        }
        else if(error === false) {
            return;
        }
    };

    return ( 
        <div className="user-pages">
            {/* <button onClick={registerFunct}>register user</button> */}

            <div className="card" style={{width: "18rem"}}>
                <form className="p-4" onSubmit={registerFunct}>
                {renderError()}

                    <div className="w-100 d-flex justify-content-center">
                        <img src={tuesdayImage} className="p-3 mb-2 mt-0"/>

                    </div>

                    <div className="form-group mb-3">
                        <input type="firstName" className="form-control" id="exampleInputFirstName" aria-describedby="firstNameHelp" placeholder="Enter First Name"
                        value={firstname}   
                        onChange={(e) => {setFirstname(e.target.value)}} 
                        required
                        ></input>
                    </div>
                    <div className="form-group mb-3">
                        <input type="lastname" className="form-control" id="exampleInputLastname" aria-describedby="lastnameHelp" placeholder="Enter Last name"
                            value={lastname}   
                            onChange={(e) => {setLastname(e.target.value)}}                         
                            required
                        ></input>
                    </div>
                    <div className="form-group mb-3">
                        <input type="username" className="form-control" id="exampleInputUsername" aria-describedby="usernameHelp" placeholder="Enter username"
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

                    <button  type="submit" className="btn btn-primary w-100 mb-2" >Submit</button>
                    <div className="d-flex justify-content-between"><p>Already have a user? <a href="/login">Login</a></p></div>
                    
                </form>
            </div>

        </div>
    );
}

