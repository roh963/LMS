import AppError from "../utils/errors.utils.js";
import jwt from "jsonwebtoken";


const isLoggedIn = async(req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new AppError("Unauthenticated ,please login again", 401))
  }
  
  try {
    const userDetails = jwt.verify(token, process.env.JWT_SECRET);
    req.user = userDetails;
    next();
  } catch (error) {
    return next(new AppError("Invalid or expired token, please login again", 401));
  }
};
const authorizeRoles =(...roles) => async(req, res, next) => {
  if (!req.user || !req.user.role) {
    return next(new AppError("Invalid or expired token, please login again", 401));
  }

  if (!roles.includes(req.user.role)) {
    return next(new AppError("You do not have permission to view this route", 403));
  }

  next();
};

const authorizeSubscribers = async(req, res, next) => {
  if (!req.user || req.user.role !== "ADMIN" && req.user.subscription.status !== "active") {
    return next(new AppError("Please subscribe to access this route.", 403));
  }

  next();
};


export {
  isLoggedIn,
  authorizeRoles,
  authorizeSubscribers,

};
