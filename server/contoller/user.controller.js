import User from "../models/user.model.js";
import AppError from "../utils/errors.utils.js";

const cookieOption ={
   maxAge:7*24*60*60*1000,  //7day
   httpOnly:true,
   secureL:true

}

const register = async(req,res,next)=>{
   const {fullName , email, password} = req.body; 

   if(!fullName || !email ||!password){
     return next(new AppError('All fields are required',400)) 
   }

   const userExist = await User.findOne({email});

   if(userExist){
    return next(new AppError('email already exist',400)) 
   }
   const user = await User.create({
    fullName,
    email,
    password,
    avator:{
        public_id:email,
        secure_url:'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg'
    }
   });
   if(!user){
      return next(new AppError("User registrantion failed ,please try again",400))
   }
   //todo: fild upload 

   await user.save();
   user.password = undefined;

   const token = await user.generateJWTTOken();

   res.res.cookie('token', token,cookieOption);

   res.status(201).json({
      success:true,
      message:"user registered successfuly",
      user,
   });;
}
const logIn  = async(req,res)=>{
  try {
   const {email,password} = req.body;
   if (!email || !password) {
      return next(new AppError('All fields are required',400)) 
   }

   const user = await User.findOne({
      email
   }).select('+password');

   if(! user || !user.comparePassword(password)){
      return next(new AppError('email or password does not match',400))  
   }

   
   const token = await user.generateJWTTOken();
   user.password = undefined;

   res.res.cookie('token', token,cookieOption);

   res.status(201).json({
      success:true,
      message:"user login successfuly",
      user,
   });
  } catch (error) {
   return next(new AppError(error.message,500))
  }
};
const logOut = async(req,res)=>{
   res.cookie("token", null,{
      maxAge:0,  //7day
      httpOnly:true,
      secureL:true
   
   } );
   res.status(201).json({
      success:true,
      message:"user logOut successfuly",
   
   });
}
const getProfile = async(req,res)=>{

   try {
      const userId = req.user.id;
      const user = await User.findById(userId)
   
      res.status(201).json({
         success:true,
         message:"user detail",
         user
      
      });

   } catch (error) {
      return next(new AppError("failed to fetch profile ",501))
   }
      
}


 export {
    register,
    logIn,
    logOut,
    getProfile
 };