import { Router } from "express";
import { getProfile, logIn, logOut, register } from "../contoller/user.controller.js";
import  {isLoggedIn } from "../middlewares/auth.middlware.js";

const routes = Router();

routes.post("/register",register);
routes.post("/login",logIn);
routes.get("/logout",logOut);
routes.get("/me",isLoggedIn,getProfile);

export default routes;