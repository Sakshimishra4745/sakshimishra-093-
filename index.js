import express from 'express';
import dotenv from "dotenv";
import  {connectdb} from "./config/db.js"
import userroutes from "./routes/userroutes.js"
import fileroutes from "./routes/fileroutes.js"
dotenv.config();

const port = process.env.PORT;
 connectdb();
const app = express();

app.use(express.json());
app.use("/user", userroutes);
app.use("/files", fileroutes);

app.listen(port,()=>{

    console.log(`the port is running on post ${port}`);
})