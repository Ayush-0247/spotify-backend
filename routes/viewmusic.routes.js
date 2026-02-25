import express from "express"; 
import viewmusic from "../controller/viewmusiccontroller.js"
const router = express.Router();

router.get("/viewmusic" , viewmusic)
export default router

