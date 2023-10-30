import Post from "../models/post.js";
import upload from "../middlewares/upload.js";
import blobService from "../services/blobService.js";

export const createPost = [upload.single('image'), async (req, res) => {
  const post = new Post(req.body);
  const file = req.file;
  
  if (file) {
    const blobName = new Date().getTime() + file.originalname;
    const blobUrl = await blobService.uploadToBlob(file.buffer, blobName, file.mimetype);
    post.imageUrls.push(blobUrl);
  }
  
  try {
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}];


export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deletePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      // Delete images from Azure Blob Storage
      if (post.imageUrls && post.imageUrls.length > 0) {
        for (let imageUrl of post.imageUrls) {
          const blobName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1); // assuming the blobName is at the end of the url
          await blobService.deleteBlob(blobName);
        }
      }
  
      await Post.findByIdAndRemove(req.params.id);
  
      res.json({ message: 'Post deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };