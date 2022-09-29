import {  createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
    message: null,
    loading: false,
    user: null,
    auth: null,
    error: false
  
}

export const authenticateUser = createAsyncThunk(
    'users/autheticate',
    async () => {

        const user = {
            "username": "Jonesy",
            "password": "Jonesy12@"
        };
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        }
        const data = await fetch('users/authenticate', config);
        const json = await data.json();
        Cookies.set("token", json.token); 

        return json;

    }
)

export const registerUser = createAsyncThunk(
    'users/register',
    async () => {

        const user = {
            "firstName": "Stephen",
            "lastName": "Jones",
            "username": "Jonesy",
            "password": "Jonesy12@"
        };
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        }
        const data = await fetch('users/register', config);
        const json = await data.json()
        console.log(json);
        return json;


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

        },

        logoutUser: (state, action) => {
            console.log('logout rucer')
            Cookies.remove('token');
            localStorage.removeItem("user");
            state.user = null;

        },

    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed

        //authenticateUser
        builder.addCase(authenticateUser.pending, (state, action) => {
            // Add user to the state array
            state.loading = true;

        })
        builder.addCase(authenticateUser.fulfilled, (state, action) => {
            // Add user to the state array
            console.log(action.payload);
            const user = {
                id: action.payload.id,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                username: action.payload.username

            };

            state.loading = false;
            state.user = user;
            localStorage.setItem("user", JSON.stringify(user));

        })
        builder.addCase(authenticateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            state.message = "Opps, something went wrong"

        })
        builder.addCase(registerUser.pending, (state, action) => {
            // Add user to the state array
            state.loading = true;

        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            // Add user to the state array
            state.loading = false;
            state.message = action.payload.message;

        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            state.message = action.payload.message;

        })
    }
    
});

export const { getUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;


