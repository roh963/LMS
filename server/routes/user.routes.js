import { Router } from "express";
import { changePassword, forgotPassword, getProfile, logIn, logOut, register, resetPassword, updateUser } from "../contoller/user.controller.js";
import  {isLoggedIn } from "../middlewares/auth.middlware.js";
import upload from "../middlewares/multer.middleware.js";

const routes = Router();

routes.post("/register",upload.single("avatar"),register);
routes.post("/login",logIn);
routes.get("/logout",logOut);
routes.get("/me",isLoggedIn,getProfile);
routes.post("/forgot/password",forgotPassword);
routes.post("/resetpassword/:resetToken",resetPassword);
routes.post("/changepassword", isLoggedIn, changePassword);
routes.put("/update/:id",isLoggedIn,upload.single("avatar"),updateUser)

export default routes;