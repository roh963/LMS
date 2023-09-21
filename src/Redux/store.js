import { configureStore  } from "@reduxjs/toolkit";
import authReducer from './slices/AuthSlice'
const store=configureStore({
    reducer:{
        auth:authReducer
     },
        devTools:true
    });
    export default store;
    