import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from './Slices/Auth.slices';
import courseSliceReducer from '../Redux/Slices/CourseSlice';
import lectureSliceReducer from './Slices/LectureSlice';

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        course:courseSliceReducer,
        lecture:lectureSliceReducer
    },
    devTools: true
});

export default store;