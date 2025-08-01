import Razorpay from "razorpay";
import app from "./app.js";
import connectionTODb from "./config/dbConnection.js";
import cloudinary from 'cloudinary'

const port = process.env.PORT||3000;

cloudinary.v2.config({
   cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
   api_key:process.env.CLOUDINARY_API_KEY,
   api_secret:process.env.CLOUDINARY_API_SECRET
})

export const razorpay = new Razorpay({
   key_id: process.env.RAZORPAY_KEY_ID,
   key_secret: process.env.RAZORPAY_SECRET,
 });

app.listen(port,
   async  () => {
      await connectionTODb();
    console.log(`Server running on port ${port} 🔥`) 
}

);