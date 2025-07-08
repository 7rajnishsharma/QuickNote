import { Request, Response } from 'express';
import User from '../models/User';
import Note from '../models/Note';
import { sendEmail } from '../utils/sendEmail';
import { generateOTP } from '../utils/generateOTP';
import jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response): Promise<void> => {
    const { name, dob, email } = req.body;

    // Validate input
    if (!name || !dob || !email) {
        res.status(400).json({ message: 'All fields are required' });
        return;
    }

    try {
        // Check if user already exists
        const existingUser  = await User.findOne({ email });
        if (existingUser ) {
            res.status(400).json({ message: 'User  already exists' });
            return;
        }

        // Generate OTP
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

        // Create new user
        const user = new User({ name, dob, email, otp, otpExpiry });
        await user.save();

        // Send OTP email
        await sendEmail(email, 'Your OTP', `Your OTP is ${otp}`);

        res.status(200).json({ message: 'OTP sent to your email' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;

    // Validate input
    if (!email) {
        res.status(400).json({ message: 'Email is required' });
        return;
    }

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: 'User  does not exist' });
            return;
        }

        // Generate OTP
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

        // Update user OTP and expiry
        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        // Send OTP email
        await sendEmail(email, 'Your OTP', `Your OTP is ${otp}`);

        res.status(200).json({ message: 'OTP sent to your email' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const verifyOTP = async (req: Request, res: Response): Promise<void> => {
    const { email, otp } = req.body;

    // Validate input
    if (!email || !otp) {
        res.status(400).json({ message: 'Email and OTP are required' });
        return;
    }

    try {
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: 'User  does not exist' });
            return;
        }

        // Check OTP and expiry
        if (!user.otpExpiry || user.otp !== otp || user.otpExpiry < new Date()) {
            res.status(400).json({ message: 'Invalid or expired OTP' });
            return;
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        // Clear OTP
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// get profile 
export const getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        // Get user ID from the request (assuming you have set it in the auth middleware)
        const userId = req.user?.id;
        // Find the user by ID
        const user = await User.findById(userId).select('name email dob'); // Select only the fields you need
        if (!user) {
            res.status(404).json({ message: 'User  not found' });
            return;
        }
        // Find notes associated with the user
        const notes = await Note.find({ userId: userId }).select('title'); // Select only the title field
        // Construct the profile response
        const profile = {
            name: user.name,
            email: user.email,
            dob: user.dob,
            notes: notes.map((note: { title: string }) => ({ title: note.title })) // Map notes to only include titles
        };
        res.status(200).json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};