import mongoose from "mongoose";

const customerschema = new mongoose.Schema({
    userName:{
        type:String,
        require:true,
    },
    email:{
      type:String,  
    require:true,
    },
    password:{
        type:String,
        require:true,

    }
})

const user = mongoose.model("customer", customerschema);

export default user;