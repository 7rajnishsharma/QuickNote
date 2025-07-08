import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    otp: { type: String },
    otpExpiry: { type: Date }, // Ensure this field is defined
});

const User = mongoose.model('User ', userSchema);
export default User;
