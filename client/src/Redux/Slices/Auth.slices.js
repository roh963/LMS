import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helper/axios.intance";

// Safe localStorage parsing
let parsedData = {};
try {
  const rawData = localStorage.getItem("data");
  parsedData = rawData && rawData !== "undefined" ? JSON.parse(rawData) : {};
} catch (e) {
  console.warn("Invalid localStorage user data:", e);
}

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  role: localStorage.getItem("role") || "",
  data: parsedData
};

// Create account
export const createAccount = createAsyncThunk(
  "/auth/signup",
  async (data) => {
    try {
      const res = axiosInstance.post("user/register", data);
      toast.promise(res, {
        loading: "Wait! creating your account",
        success: (res) => res?.data?.message,
        error: "Failed to create account"
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// Update profile
export const updateProfile = createAsyncThunk(
  "/user/update/profile",
  async (data) => {
    try {
      const res = axiosInstance.put(`user/update/${data[0]}`, data[1]);
      toast.promise(res, {
        loading: "Wait! profile update in progress...",
        success: (res) => res?.data?.message,
        error: "Failed to update profile"
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// Get user data
export const getUserData = createAsyncThunk(
  "/user/details",
  async () => {
    try {
      const res = axiosInstance.get("user/me");
      return (await res).data;
    } catch (error) {
      toast.error(error.message);
    }
  }
);

// Login
export const login = createAsyncThunk(
  "/auth/login",
  async (data) => {
    try {
      const res = axiosInstance.post("user/login", data);
      toast.promise(res, {
        loading: "Logging in...",
        success: (res) => res?.data?.message,
        error: "Failed to login"
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// Logout
export const logout = createAsyncThunk(
  "/auth/logout",
  async () => {
    try {
      const res = axiosInstance.get("user/logout");
      toast.promise(res, {
        loading: "Logging out...",
        success: (res) => res?.data?.message,
        error: "Failed to log out"
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const user = action?.payload?.user;
        if (!user) return;

        localStorage.setItem("data", JSON.stringify(user));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", user?.role);

        state.isLoggedIn = true;
        state.data = user;
        state.role = user?.role;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.isLoggedIn = false;
        state.data = {};
        state.role = "";
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        const user = action?.payload?.user;
        if (!user) return;

        localStorage.setItem("data", JSON.stringify(user));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", user?.role);

        state.isLoggedIn = true;
        state.data = user;
        state.role = user?.role;
      });
  }
});

export default authSlice.reducer;
