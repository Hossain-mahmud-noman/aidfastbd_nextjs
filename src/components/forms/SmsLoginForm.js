'use client';
import React, { useState } from 'react';
import { base_endpoint } from '../../utils/constants';
import OTPVerification from './OTPVerification';

const SmsLoginForm = () => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [mobileNo, setMobileNo] = useState('');
    const [isSuccessed, setIsSuccessed] = useState(null);
    const [otpCode, setOtpCode] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Validate that the mobile number is 11 digits
        if (!/^\d{11}$/.test(mobileNo)) {
            setError('Mobile number must be exactly 11 digits.');
            setIsLoading(false);
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${base_endpoint}/Auth/SMS`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                },
                body: JSON.stringify({
                    mobileNo: mobileNo
                }),
            });

            const data = await response.json();

            if (response.ok) {
                if (data.message === "INVALID" || data.token === "") {
                    setError('Already exits account');
                    setIsLoading(false);
                    return;
                }
                setOtpCode(data.message);
                setIsSuccessed({
                    id: data.id,
                    isSmsSend: 1,
                    status: 1,
                    isSmsVerified: 1,
                    imageUrl: "https://api.aidfastbd.com/",
                    isPatient: false,
                    token: data.token,
                });
            } else {
                setError(data.message || 'SMS Login OTP send failed');
            }
        } catch (err) {
            setError(err.message || 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }

    };

    return (
        <>
            {isSuccessed === null ? <div className="flex flex-col items-center justify-center bg-gray-100 pt-4 px-4">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full">
                    <p className="text-center text-gray-700 mb-6">Be Happy and Be Healthy</p>

                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}


                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 relative">
                            <input
                                value={mobileNo}
                                onChange={(e) => setMobileNo(e.target.value)}
                                type="text"
                                placeholder="Enter mobile number"
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full p-3 rounded-lg text-white transition duration-200 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                                }`}
                        >
                            {isLoading ? 'Processing...' : 'Next'}
                        </button>
                    </form>


                    <div className="text-center mt-2 mb-2">
                        <a href="/registration" className="text-blue-500 hover:underline">
                            Signup using email or mobile number.
                        </a>
                    </div>
                    <div className="text-center mt-2 mb-2">
                        <a href="/login" className="text-blue-500 hover:underline">
                            Login using password.
                        </a>
                    </div>
                </div>
            </div> : (
                <>
                 
                    <OTPVerification user={isSuccessed} otpCode={otpCode} />
                </>)}
        </>
    );
};

export default SmsLoginForm;
