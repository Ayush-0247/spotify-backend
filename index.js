import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDatabase from "./config/db.js";
import authroutes from "./routes/auth.routes.js";
import musicroutes from "./routes/music.routes.js";
import viewmusicroutes from "./routes/viewmusic.routes.js";
connectToDatabase();
const app = express();

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

app.use("/api/auth", authroutes);
app.use("/api/music", musicroutes);
app.use("/api/viewmusic", viewmusicroutes);

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to Spot API",
    success: true,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Backend running");
});
