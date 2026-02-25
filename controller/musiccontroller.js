import Music from "../models/music.model.js";
import jwt from "jsonwebtoken";
import uploadFile from "../services/storage.services.js";

export const creatmusic = async (req, res) => {
  try {
    /* ---------------- AUTH CHECK ---------------- */
    const token =
      req.cookies?.token ||
      (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }
    console.log("Private Key:", process.env.IMAGEKIT_PRIVATE_KEY);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "artist") {
      return res.status(403).json({
        success: false,
        message: "Only artists can upload music",
      });
    }

    /* ---------------- VALIDATION ---------------- */
    const { title } = req.body;
    const file = req.file;
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Audio file is required",
      });
    }
    if (!title || !file) {
      return res.status(400).json({
        success: false,
        message: "Title and audio file are required",
      });
    }

    /* ---------------- UPLOAD TO STORAGE ---------------- */
    const base64 = file.buffer.toString("base64");
    const dataUri = `data:${file.mimetype};base64,${base64}`;
    const uploadResponse = await uploadFile({
      file: dataUri,
      fileName: file.originalname,
    });

    /* ---------------- SAVE TO DATABASE ---------------- */
    const music = await Music.create({
      title,
      uri: uploadResponse.url,
      artist: decoded.userId,
    });

    return res.status(201).json({
      success: true,
      message: "Music uploaded successfully",
      music,
    });
  } catch (error) {
    console.error(error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
