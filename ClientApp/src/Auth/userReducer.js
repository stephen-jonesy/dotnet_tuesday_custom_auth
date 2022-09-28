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

        logoutUser: (state, action) => {
            const filterProjects = state.projects.map((project) =>
                project.id === action.payload ? {...project, isComplete: !project.isComplete} : project);
            state.projects = filterProjects;
            
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
            state.loading = false;
            state.user = action.payload

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

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;


