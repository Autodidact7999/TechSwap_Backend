import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    institution: { type: mongoose.Schema.Types.ObjectId, ref: 'Institution' },
    techStacks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TechStack' }],
  });

// Hash the password before saving the user model


const User = mongoose.model('User', UserSchema);
export default User;