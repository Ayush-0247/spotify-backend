import express from "express";
const router = express.Router();
import multer from "multer";

import { creatmusic } from "../controller/musiccontroller.js";
import viewmusic from "../controller/viewmusiccontroller.js";

const upload = multer({ storage: multer.memoryStorage() });

router.post("/create", upload.single("audio"), creatmusic);
router.get("/view", viewmusic);
export default router;
