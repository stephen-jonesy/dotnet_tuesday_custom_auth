import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Auth/userReducer';
import projectsReducer from '../projects/projectsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    projects: projectsReducer,

  },
});
