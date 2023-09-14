import { configureStore } from '@reduxjs/toolkit';
import autheSliceReducer from './slices/AuthSlice';
const store = configureStore({
    reducer:{
        auth:autheSliceReducer
    },
    devTools: true
});
export default store;
