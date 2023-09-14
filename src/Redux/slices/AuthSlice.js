import { createSlice } from "@reduxjs/toolkit";


const intialState ={
    isLoggedIn: localStorage.getItem('isLoggedin') || false,
    role:localStorage.getItem('role') || "",
    data:localStorage.getItem('data') || {}
}
const authSlice = createSlice({
    name:'auth',
    intialState,
    reducers:{},
})
// export const {} = authSlice.actions;
export default authSlice.reducer;