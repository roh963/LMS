import { createSlice } from "@reduxjs/toolkit";



    const initialState = {
        isLoggedIn: localStorage.getItem("isLoggedIn") || false,
        role: localStorage.getItem("role") || "",
        data: localStorage.getItem("data") || {}
    } 
   
export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
}
);

// export const {action} = authSlice.actions;
export default authSlice.reducer;