import express from "express"
import { registeruser,loginuser } from "../controllers/usercontroller.js";


const router = express.Router()

router.post("/create",registeruser);

router.get("/login",loginuser);

export default router;