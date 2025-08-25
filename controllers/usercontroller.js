import customerschema from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const registeruser = async (req, res) => {
    try{
        const{userName,email,password}=req.body;
        
    const logged = await customerschema.findOne({ email });
    if (logged) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);


    const createdUser = await customerschema.create({
      userName,
      email,
      password: hash,
    });


    const token = jwt.sign({ email }, process.env.PASS_KEY);
    res.cookie("token", token);

  
    await registerEmail(email, userName);

    return res
      .status(201)
      .json({ message: "User created & email sent ", data: createdUser });
  } catch (error) {
    console.error(" Error in createUser:", error);
    return res.status(500).json({ message: "Internal server error" });
    }
}

export const loginuser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const loggeduser = await customerschema.findOne({ email })

        if (!loggeduser) {
            return res.json({ message: "something went wrong" });
        }

        bcrypt.compare(password, loggeduser.password, function (err, result) {
          
            let token = jwt.sign({ email }, `${process.env.PASS_KEY}`)
            res.cookie("token", token);
            res.status(201).json({message:"you are logged in",success:true,data:token})

        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });

    }

}


