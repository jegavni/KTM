import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: String,
  position: String,
  location: String
});

export default mongoose.model("Member", memberSchema);