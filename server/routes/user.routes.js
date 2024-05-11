import { Router } from "express";
import { forgotPassword, getProfile, logIn, logOut, register, resetPassword } from "../contoller/user.controller.js";
import  {isLoggedIn } from "../middlewares/auth.middlware.js";
import upload from "../middlewares/multer.middleware.js";

const routes = Router();

routes.post("/register",upload.single("avatar"),register);
routes.post("/login",logIn);
routes.get("/logout",logOut);
routes.get("/me",isLoggedIn,getProfile);
routes.post("/forgot/password",forgotPassword);
routes.post("/reset-password",resetPassword);

export default routes;