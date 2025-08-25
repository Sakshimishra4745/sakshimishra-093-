import express from 'express';
import dotenv from "dotenv";
import  {connectdb} from "./config/db.js"

dotenv.config();

const port = process.env.PORT;
 connectdb();
const app = express();

app.use(express.json());

app.listen(port,()=>{

    console.log(`the port is running on post ${port}`);
})