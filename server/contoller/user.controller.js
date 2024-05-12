import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import User from "../models/user.model.js";
import AppError from "../utils/errors.utils.js";
import cloudinary from "cloudinary"
import fs from 'fs/promises'
import sendEmail from "../utils/sendEmail.js";
import crypto from 'node:crypto'

const cookieOption ={
   maxAge:7*24*60*60*1000,  //7day
   httpOnly:true,
   secureL:true

}
const register = asyncHandler( async(req,res,next)=>{
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
    avatar:{
        public_id:email,
        secure_url:'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg'
    }
   });
   if(!user){
      return next(new AppError("User registrantion failed ,please try again",400))
   }
   //todo: fild upload 
   console.log(`file details ->`,JSON.stringify(req.file));
   if(req.file) {
      try {
         const result = await cloudinary.v2.uploader.upload(req.file.path,{
             folder:'lms',
             width:250,
             height:250,
             gravity:'faces',
             crop:'fill'
         });
          
         if(result){
            user.avatar.public_id = result.public_id;
            user.avatar.secure_url = result.secure_url;
         }
         // remove file from e server 
         fs.rm(`uploads/${req.file.filename}`)

      } catch (e) {
         return next( new AppError(error|| 'fiel not uploaded, please  try again',404));
      }
   }




   await user.save();
   user.password = undefined;

   const token = await user.generateJWTTOken();

   res.cookie('token', token,cookieOption);

   res.status(201).json({
      success:true,
      message:"user registered successfuly",
      user,
   });
});
const logIn  =  asyncHandler(async(req,res,next)=>{
  try {
   const {email,password} = req.body;
   if (!email || !password) {
      return next(new AppError('All fields are required',400)) 
   }

   const user = await User.findOne({
      email
   }).select('+password');

   if(! (user || await user.comparePassword(password))){
      return next(new AppError('email or password does not match',400))  
   }

   
   const token = await user.generateJWTTOken();
   user.password = undefined;

   res.cookie('token', token,cookieOption);

   res.status(201).json({
      success:true,
      message:"user login successfuly",
      user,
   });
  } catch (error) {
   return next(new AppError(error.message,500))
  }
});
const logOut =asyncHandler( async(req,res,next)=>{
   res.cookie("token", null,{
      maxAge:0,  //7day
      httpOnly:true,
      secureL:true
   
   } );
   res.status(201).json({
      success:true,
      message:"user logOut successfuly",
   
   });
});
const getProfile = asyncHandler(async(req,res,next)=>{

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
      
});

const forgotPassword = asyncHandler(async(req,res,next)=>{
   const {email } = req.body;
   if (!email) {
      return next(new AppError('email is requied ',400));
   }

   const user = await User.findOne({email});
   if (!user) {
      return next(new AppError('email is not  registered',400));
   } 

   const resetToken = await user.generatePasswordResetToken();

   await user.save();

   const resetPasswordURL = `${process.env.FRONTEND_URL}/forgot/password/${resetToken}`;
   
   const subject = 'Reset Password';
   const message = `You can reset your password by clicking <a href=${resetPasswordURL} target="_blank">Reset your password</a>\nIf the above link does not work for some reason then copy paste this link in new tab ${resetPasswordURL}.\n If you have not requested this, kindly ignore.`;
 
    
   try {
      await sendEmail(email,subject,message);

      res.status(200).json({
         success:true,
         message:`Rest password token has been sent to  ${email} successfully`
      })
   } catch (e) {
      user.forgotPasswordExpiry=undefined;
      user.forgotPasswordToken=undefined;
      await user.save();
      return next(new AppError(e.message,500));
   }
});
const resetPassword = asyncHandler(async(req,res,next)=>{
        const {resetToken} = req.params;

        const {password} =req.body;

        const forgotPasswordToken=crypto.createHash('sha256')
        .update(resetToken)
        .digest('hex');

        const user = await User.findOne({
         forgotPasswordToken,
         forgotPasswordExpiry:{$gt:Date.now()}
        });

        if(!user){
         return next(new AppError('token is invalid or expired please try again',400));
        }
         user.password = password;
         user.forgotPasswordToken=undefined;
         user.forgotPasswordExpiry= undefined;

         user.save();

         res.status(200).json({
            success:true,
            message:'Password changed successfully'
         })


});
  const changePassword=asyncHandler(async(req,res,next)=>{
   const {oldPassword,newPassword} =req.body;
   const {id} = req.user;

   if(!oldPassword || !newPassword){
      return next( new AppError("All fields are mondatory are required ",400))
   }

   const user = await User.findById(id).select('+password');

   if (!user) {
      return next( new AppError("user not exist",400))
   }
   const isPasswordValid = await user.comparePassword(oldPassword);
   if(!isPasswordValid){
      return next( new AppError("Invalid old password",400))
   }
   user.password = newPassword;
   await user.save();
   user.password = undefined;

   res.status(200).json({
      success:true,
      message:"password changed succesfully"
   });
  });
  const updateUser = asyncHandler(async(req,res,next)=>{
     const {fullName} = req.body;
     const {id} = user.params;

     const user = await User.findById(id);

     if (!user) {
      return next( new AppError("user dos not exist",400) );
     }
     if(req.fullName){
      user.fullName = fullName;
     }
     if (req.file) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);
      try {
         const result = await cloudinary.v2.uploader.upload(req.file.path,{
             folder:'lms',
             width:250,
             height:250,
             gravity:'faces',
             crop:'fill'
         });
          
         if(result){
            user.avatar.public_id = result.public_id;
            user.avatar.secure_url = result.secure_url;
         }
         // remove file from e server 
         fs.rm(`uploads/${req.file.filename}`)

      } catch (e) {
         return next( new AppError(error|| 'file not uploaded, please  try again',404));
      }

     }
     await user.save();
     res.status(200).json({
      success:true,
      message:"user profile updated succesfully"
     })
  });

 export {
    register,
    logIn,
    logOut,
    getProfile,
    forgotPassword,
    resetPassword,
    changePassword,
    updateUser
 };