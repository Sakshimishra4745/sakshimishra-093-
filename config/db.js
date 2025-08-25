import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


 export const connectdb = async ()=>{
try{
await mongoose.connect (`${process.env.MONGO_URL}`);
console.log("mongoose connected");
}
catch(error){
   res.status(400).json({message:error.message});

}
}