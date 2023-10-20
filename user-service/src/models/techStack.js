import mongoose from 'mongoose';

const TechStackSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  // add other properties if needed
});

export default mongoose.model('TechStack', TechStackSchema);