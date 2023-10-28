import mongoose from 'mongoose';

const CommunitySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  techStacks: [{ type: mongoose.Schema.Types.ObjectId, ref: "TechStack" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Community = mongoose.model("Community", CommunitySchema);
export default Community;