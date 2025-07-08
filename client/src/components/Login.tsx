// src/components/Login.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError(null);
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { email });
            setOtpSent(true);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data.message || 'An error occurred during login.');
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
      {/* Left: Login form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-6 py-8">
        <div className="w-full max-w-[350px]">
          <div className="flex flex-col items-center text-center">
            <img src="logo2.svg" alt="Logo" className="h-8 mb-4" />
            <h1 className="mb-4 font-bold text-3xl">Sign in</h1>
          </div>

          {error && <p className="text-red-500 mb-2">{error}</p>}

          {/* Email Input */}
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

          <button
            onClick={handleLogin}
            className="mt-4 w-full h-[52px] rounded-[10px] px-2 py-4 bg-[#367AFF] text-white font-medium flex items-center justify-center gap-2"
          >
            Get OTP
          </button>

          {otpSent && (
            <>
              <p className="text-sm text-gray-600 mt-4">OTP sent to your email</p>

              {/* OTP Input */}
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
                className="mt-2 w-full h-[52px] rounded-[10px] px-2 py-4 bg-[#367AFF] text-white font-medium flex items-center justify-center gap-2"
              >
                Verify OTP
              </button>
            </>
          )}

          <p className="mt-6 text-center text-sm">
            Don't have an account?{" "}
            <a href="/signup" className="text-[#367AFF] font-semibold underline">
              Create One
            </a>
          </p>
        </div>
      </div>

      {/* Right: Image */}
      <div className="hidden lg:block w-full lg:w-1/2 h-full">
        <img
          src="auth.jpg"
          alt="Auth Visual"
          className="w-full h-full object-cover p-2 rounded-[14px]"
        />
      </div>
    </div>
  



        </>

    );
};

export default Login;
