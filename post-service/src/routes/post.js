import express from 'express';
import * as postController from '../controllers/postController.js';

const router = express.Router();

router.post('/', postController.createPost);
router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

export default router;