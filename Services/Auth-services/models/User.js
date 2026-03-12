import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  phone: {
    type: String,
    required: true
  },

  location: {
    type: String
  },

  role: {
    type: String,
    enum: ["admin", "member"],
    default: "member"
  },

  password: {
    type: String,
    required: true
  },
    profilePic: {
    type: String,
    default: ""
  }
});

const User = mongoose.model("User", UserSchema);

export default User;