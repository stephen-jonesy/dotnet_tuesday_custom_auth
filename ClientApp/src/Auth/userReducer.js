import {  createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
    message: null,
    loading: false,
    user: null,
    auth: false,
    error: false
  
}

export const authenticateUser = createAsyncThunk(
    'users/autheticate',
    async (userObj, thunkAPI) => {

        const user = {
            "username": userObj.username,
            "password": userObj.password
        };

        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        }

        try {

            const data = await fetch('users/authenticate', config);
            const json = await data.json();
            console.log(json);
            if(data.ok == true) {
                console.log('thunk forfiled')
                console.log('token is valid');
                Cookies.set("token", json.token); 
                return json;

            } else {
                console.log('thunk rejected')

                return thunkAPI.rejectWithValue(json);

            }


        } catch (err) {
        // Use `err.response.data` as `action.payload` for a `rejected` action,
        // by explicitly returning it using the `rejectWithValue()` utility
            console.log('thunk rejected')
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const registerUser = createAsyncThunk(
    'users/register',
    async (userObj,  thunkAPI ) => {
        const user = {
            "firstName": userObj.firstname,
            "lastName": userObj.lastname,
            "username": userObj.username,
            "password": userObj.password
        };

        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        }

        try {

            const data = await fetch('users/register', config);
            const json = await data.json()
            console.log(data.ok);
            console.log(json);
            if(data.ok == true) {
                console.log('thunk forfiled')

                return json;

            } else {
                console.log('thunk rejected')

                return thunkAPI.rejectWithValue(json);

            }


        } catch (err) {
        // Use `err.response.data` as `action.payload` for a `rejected` action,
        // by explicitly returning it using the `rejectWithValue()` utility
            console.log('thunk rejected')
            return thunkAPI.rejectWithValue(err.message)
        }

    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        // removeProject: (state, action) => {
        //     console.log(current(state.projects));
        //     const filterProjects = state.projects.filter((project) => project.id !== action.payload);
        //     state.projects = filterProjects;
        // },
        getUser: (state, action) => {
            state.user = action.payload;
            state.auth = true;

        },

        logoutUser: (state, action) => {
            console.log('logout rucer')
            Cookies.remove('token');
            sessionStorage.removeItem("user");
            state.user = null;
            state.auth = false;

        },

    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
        //authenticateUser
        .addCase(authenticateUser.pending, (state, action) => {
            // Add user to the state array
            state.loading = true;

        })
        .addCase(authenticateUser.fulfilled, (state, action) => {
            // Add user to the state array
            console.log(action.payload);
            console.log("has error", !"errors" in action.payload);
            
            if ('message' in action.payload || "errors" in action.payload) {
                console.log('error message')
                state.user = null;
                state.auth = false;

            }
            else {
                const user = {
                    id: action.payload.id,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    username: action.payload.username
    
                };
    
                state.loading = false;
                state.user = user;
                sessionStorage.setItem("user", JSON.stringify(user));
                state.auth = true;
                console.log('is furfiled');

            }


        })
        .addCase(authenticateUser.rejected, (state, action) => {
            console.log(action.payload);

            state.loading = false;
            state.error = true;
            state.message = "Opps, something went wrong";
            state.auth = false;


        })
        .addCase(registerUser.pending, (state, action) => {
            // Add user to the state array
            state.loading = true;

        })
        .addCase(registerUser.fulfilled, (state, action) => {
            // Add user to the state array
            console.log('fulfiled', action);

            state.loading = false;
            state.message = action.payload.message;

        })
        .addCase(registerUser.rejected, (state, action) => {
            console.log('rejected', action);
            state.loading = false;
            state.error = true;
            state.message = action.payload.message;

        })
    }
    
});

export const { getUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;


