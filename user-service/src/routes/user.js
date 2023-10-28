import express from 'express';
import { registerUser, loginUser, getUser, editUser,getAllUser,deleteUser } from '../controllers/userController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', getUser);
router.get('/', getAllUser);
router.put('/:id', editUser);
router.delete('/:id', auth, deleteUser);

export default router;