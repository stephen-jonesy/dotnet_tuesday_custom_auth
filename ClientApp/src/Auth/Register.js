import React, { useState, useEffect } from 'react';
import { registerUser } from './userReducer';
import { useSelector, useDispatch } from 'react-redux';


export function Register () {
    const dispatch = useDispatch();
    const selectMessage = (state) => state.user.message;
  
    const message = useSelector(selectMessage);
    console.log(message);
    async function registerFunct() {
        dispatch(registerUser());
    }

    return ( 
        <div>
            Register
            <button onClick={registerFunct}>register user</button>

        </div>
    );
}

