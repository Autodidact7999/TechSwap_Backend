import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  institution: { type: mongoose.Schema.Types.ObjectId, ref: "Institution" },
  techStacks: [{ type: mongoose.Schema.Types.ObjectId, ref: "TechStack" }],
});

const User = mongoose.model("User", UserSchema);
export default User;
