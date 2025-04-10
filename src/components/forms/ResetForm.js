'use client';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetForm = ({ user }) => {
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('https://api.aidfastbd.com/api/Auth/ResetPassword', {
                method: 'PUT',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password:password,
                    mobileNoOrEmail: user.mobileNoOrEmail, 
                }),
            });

            if (response.ok) {
                setSuccess('Password reset successfully!');
                setPassword('');
                setConfirmPassword('');
            } else {
                const data = await response.json();
                setError(data.message || 'Password reset failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 pt-4 px-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full">
                <p className="text-center text-gray-700 mb-6">Be Happy and be healthy</p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4 relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter New Password"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                        >
                            {showPassword ? (
                                <FaEyeSlash className="h-5 w-5 text-gray-400" />
                            ) : (
                                <FaEye className="h-5 w-5 text-gray-400" />
                            )}
                        </button>
                    </div>

                    <div className="mb-4 relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Enter Confirm Password"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                        >
                            {showConfirmPassword ? (
                                <FaEyeSlash className="h-5 w-5 text-gray-400" />
                            ) : (
                                <FaEye className="h-5 w-5 text-gray-400" />
                            )}
                        </button>
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm mb-4">{error}</p>
                    )}
                    {success && (
                        <p className="text-green-500 text-sm mb-4">{success}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full p-3 rounded-lg text-white ${isLoading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                            } transition duration-200`}
                    >
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetForm;
