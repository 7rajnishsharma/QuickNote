import express, { RequestHandler } from 'express';
import { signup, login, verifyOTP , getProfile } from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/signup', signup as RequestHandler);
router.post('/login', login as RequestHandler);
router.post('/verify-otp', verifyOTP as RequestHandler);
router.get('/profile', authMiddleware as RequestHandler, getProfile as RequestHandler);

export default router;
