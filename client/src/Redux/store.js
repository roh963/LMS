import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from './Slices/Auth.slices';
import courseSliceReducer from '../Redux/Slices/CourseSlice';

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        course:courseSliceReducer
    },
    devTools: true
});

export default store;