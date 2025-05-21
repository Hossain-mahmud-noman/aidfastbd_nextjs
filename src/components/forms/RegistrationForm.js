'use client';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { base_endpoint } from '../../utils/constants';
import OTPVerification from './OTPVerification';
import { toast, Toaster } from 'sonner';
import { useRouter } from 'next/navigation';
const RegistrationForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationType, setRegistrationType] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mobileEmailNo, setMobileEmailNo] = useState('');
  const [isSuccessed, setIsSuccessed] = useState(null);
  const [otpCode, setOtpCode] = useState('');

  const validateInputs = () => {
    if (!mobileEmailNo.trim() || !password.trim() || !confirmPassword.trim() || !registrationType) {
      setError('All fields are required');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateInputs()) return;
    setIsLoading(true);
    try {
      const response = await fetch(`${base_endpoint}/Auth/Register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
        },
        body: JSON.stringify({
          mobileNoOrEmail: mobileEmailNo,
          password,
          isPatient: registrationType
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.message === "INVALID" || data.token === "") {
          // setError('Already exits account');
          toast.error("Already exits account");
          setTimeout(() => router.push("/"), 1000);
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
        // setError(data.message || 'Registration failed');
        toast.error(data.message || 'Registration failed');
      }
    } catch (err) {
      // setError(err.message || 'An unexpected error occurred');
      toast.error(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Toaster position='top-right' />
      <div>
        {isSuccessed === null ? (
          <div className="flex flex-col items-center justify-center pt-4 px-4">
            <div className="bg-white p-6 rounded-lg shadow-custom-light w-full max-w-md mt-6">
              <p className="text-center text-gray-700 mb-6">
                Register with the best healthcare providers
              </p>
              {error && <p className="text-red-500 text-center mb-4">{error}</p>}

              <form onSubmit={handleSignup}>
                <div className="mb-4">
                  <input
                    value={mobileEmailNo}
                    type="text"
                    onChange={(e) => setMobileEmailNo(e.target.value)}
                    placeholder="Enter email or phone number"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4 relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  >
                    {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                  </button>
                </div>

                <div className="mb-4 relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  >
                    {showConfirmPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                  </button>
                </div>

                <div className="mb-4">
                  <select
                    value={registrationType}
                    onChange={(e) => setRegistrationType(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="" disabled>
                      Select Registration Type
                    </option>
                    <option value="patient">User or Patient</option>
                    <option value="doctor">Doctor</option>
                    <option value="pharmacy">Pharmacy</option>
                    <option value="diagnostic">Diagnostic Center</option>
                    <option value="bloodbank">Blood Bank Club</option>
                    <option value="ambulance">Ambulance</option>
                    <option value="dentalClinic">Dental Clinic</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className={`w-full p-3 rounded-lg text-white transition duration-200 ${isLoading
                    ? 'bg-blue-300 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'REGISTER'}
                </button>
              </form>

              <p className="text-center mt-4">
                Have an account?{' '}
                <a href="/login" className="text-blue-500 hover:underline">
                  Login
                </a>
              </p>
            </div>
          </div>
        ) : (
          <>
            <OTPVerification mobileEmailNo={mobileEmailNo} user={isSuccessed} otpCode={otpCode} />
          </>)}
      </div>
    </div>
  );
};

export default RegistrationForm;
