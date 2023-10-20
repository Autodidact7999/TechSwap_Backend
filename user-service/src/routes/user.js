import express from 'express';
import { registerUser, loginUser, getUser, editUser,getAllUser,deleteUser } from '../controllers/userController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', auth, getUser);
router.get('/', auth, getAllUser);
router.put('/:id', auth, editUser);
router.delete('/:id', auth, deleteUser);

export default router;