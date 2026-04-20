import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../reducers/authReducer";
import movieReducer from "../reducers/movieReducer";

const store = configureStore({
    reducer: {
        auth: authReducer,
        movie: movieReducer
    },
});

export default store;