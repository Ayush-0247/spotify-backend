import jwt from "jsonwebtoken";
import Music from "../models/music.model.js";

const viewmusic = async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    // Allow any authenticated user to view music
    const musics = await Music.find({}).populate("artist", "_id");

    return res.status(200).json({ success: true, musics });
  } catch (error) {
    console.error("viewmusic error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export default viewmusic;