import mongoose from "mongoose";

mongoose.set('strictQuery',false);

const connectionTODb =async()=>{
  try {
    const{connection}= await mongoose.connect(
        process.env.MONGO_URI || `mongodb://localhost:27017/LMS` 
   );
   if(connection){
       console.log(`Connected to mongoDb : ${connection.host}`);
   }
  } catch (e) {
    console.log(e);
    process.exit(1)
  }
}

export default connectionTODb