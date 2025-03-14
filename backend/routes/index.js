import { register, login ,getUser, getUserById, deleteUser, logout} from '../controllers/usercontrollers.js';
import express from 'express';
import {VerifyToken} from '../middleware/verivyToken.js';
import { uploadVideo, getVideos, getVideoById, deleteVideo } from '../controllers/videocontrollers.js';

const router = express.Router();

router.post('/video/upload', uploadVideo);
router.get('/video', getVideos);
router.get('/video/:id', getVideoById);
router.delete('/video/:id', deleteVideo);



router.get('/users',VerifyToken,getUser);
router.get('/users/:id', VerifyToken,getUserById);
router.post('/register', register);
router.post('/login', login);
router.delete('/delete/:id', VerifyToken,deleteUser);
router.post('/logout', VerifyToken,logout);

export default router;