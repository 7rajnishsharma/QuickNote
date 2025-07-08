// src/components/Signup.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSignup = async () => {
        setError(null);
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, { name, dob, email });
            setOtpSent(true);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data.message || 'An error occurred during signup.');
            } else {
                setError('An unexpected error occurred.');
            }
        }
    };

    const handleVerifyOtp = async () => {
        setError(null);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/verify-otp`, { email, otp });
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data.message || 'Invalid OTP. Please try again.');
            } else {
                setError('An unexpected error occurred.');
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl mb-4">Signup</h1>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="mb-2 p-2 border" />
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="mb-2 p-2 border" />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-2 p-2 border" />
            <button onClick={handleSignup} className="mb-2 p-2 bg-blue-500 text-white">Get OTP</button>
            {otpSent && (
                <>
                    <p>OTP sent to your email</p>
                    <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="mb-2 p-2 border" />
                    <button onClick={handleVerifyOtp} className="p-2 bg-green-500 text-white">Verify OTP</button>
                </>
            )}
            <p className="mt-4">Have an account? <a href="/login" className="text-blue-500">Login</a></p>
        </div>
    );
};

export default Signup;
