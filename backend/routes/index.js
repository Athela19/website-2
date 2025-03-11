import { register, login ,getUser, getUserById, deleteUser, logout} from '../controllers/usercontrollers.js';
import {VerifyToken} from '../middleware/verivyToken.js';
import express from 'express';

const router = express.Router();

router.get('/users',VerifyToken,getUser);
router.get('/users/:id', VerifyToken,getUserById);
router.post('/register', register);
router.post('/login', login);
router.delete('/delete/:id', VerifyToken,deleteUser);
router.post('/logout', VerifyToken,logout);

export default router;