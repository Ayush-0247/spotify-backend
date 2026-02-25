import mongoose from "mongoose";

const musicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  uri: {
    type: String,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
}, {
  timestamps: true
});

const Music = mongoose.model("Music", musicSchema);

export default Music;