import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  community: { type: mongoose.Schema.Types.ObjectId, ref: 'Community', required: true },
  likes: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  }],
  imageUrls: [{ type: String }],
}, {
  timestamps: true, // This creates createdAt and updatedAt fields automatically
});

const Post = mongoose.model('Post', postSchema);

export default Post;