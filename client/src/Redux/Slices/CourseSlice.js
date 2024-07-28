import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast";

import axiosInstance from "../../Helper/axios.intance";


const initialState = {
    courseData:[]
}

export const getAllCourses = createAsyncThunk("/course/get",async()=>{
    try {
        const response = axiosInstance.get("/courses");
        toast.promise(response,{
            loading: "loading course data...",
            success: "Course data loaded successfully",
            error: "Error loading course data"
        })

        
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            if(action.payload) {
                state.courseData = [...action.payload];
            }
        })
    }
});

export default courseSlice.reducer;