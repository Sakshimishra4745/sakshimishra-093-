import express from 'express';
import dotenv from "dotenv";
import  {connectdb} from "./config/db.js"
import userroutes from "./routes/userroutes.js"
dotenv.config();

const port = process.env.PORT;
 connectdb();
const app = express();

app.use(express.json());
app.use("/user", userroutes);

app.listen(port,()=>{

    console.log(`the port is running on post ${port}`);
})