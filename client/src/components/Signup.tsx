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
        <>
            <div className="flex flex-col lg:flex-row h-screen w-full">
      {/* Left side - Signup form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-6 py-8">
        <div className="w-full max-w-[350px]">
          <div className="flex flex-col items-center text-center">
            <img src="logo2.svg" alt="Logo" className="h-8 mb-4" />
            <h1 className="mb-4 font-bold text-3xl">Sign up</h1>
            <p className="text-gray-500 mb-6 text-sm">Sign up to enjoy the feature of HD</p>
          </div>

          {error && <p className="text-red-500 mb-2">{error}</p>}

          {/* Name Field */}
          <div className="relative mb-5">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder=" "
              className="peer block w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#367AFF]"
            />
            <label
              htmlFor="name"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
            >
              Your Name
            </label>
          </div>

          {/* DOB Field */}
          <div className="relative mb-5">
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              placeholder=" "
              className="peer block w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#367AFF]"
            />
            <label
              htmlFor="dob"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
            >
              Date of Birth
            </label>
          </div>

          {/* Email Field */}
          <div className="relative mb-5">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              className="peer block w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#367AFF]"
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
            >
              Email
            </label>
          </div>

          {!otpSent ? (
            <button
              onClick={handleSignup}
              className="mt-4 w-full h-[52px] rounded-[10px] px-2 py-4 bg-[#367AFF] text-white font-medium flex items-center justify-center gap-2"
            >
              Get OTP
            </button>
          ) : (
            <>
              <p className="text-sm text-gray-600 mt-2">OTP sent to your email</p>
              <div className="relative mt-4 mb-5">
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder=" "
                  className="peer block w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#367AFF]"
                />
                <label
                  htmlFor="otp"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
                >
                  Enter OTP
                </label>
              </div>

              <button
                onClick={handleVerifyOtp}
                className="mt-4 w-full h-[52px] rounded-[10px] px-2 py-4 bg-[#367AFF] text-white font-medium flex items-center justify-center gap-2"
              >
                Verify OTP
              </button>
            </>
          )}

          <p className="mt-6 text-center text-sm">
            Already have an account?{' '}
            <a href="/login" className="text-[#367AFF] font-semibold underline">
              Sign in
            </a>
          </p>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block w-full lg:w-1/2 h-full">
        <img
          src="auth.jpg"
          alt="Signup Visual"
          className="w-full h-full object-cover p-2 rounded-[14px]"
        />
      </div>
    </div>
        </>
    );
};

export default Signup;
