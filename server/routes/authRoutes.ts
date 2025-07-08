import express, { RequestHandler } from 'express';
import { signup, login, verifyOTP } from '../controllers/authController';

const router = express.Router();

router.post('/signup', signup as RequestHandler);
router.post('/login', login as RequestHandler);
router.post('/verify-otp', verifyOTP as RequestHandler);

export default router;
