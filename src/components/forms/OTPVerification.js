'use client';
import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiAlertCircle } from "react-icons/fi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

const OTPVerification = ({ user, otpCode, isForget = false, mobileEmailNo }) => {
  const { login } = useAuth()
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const otpValue = otp.join("");

      if (otpValue.length !== 4) {
        toast.error("Please enter a valid 4-digit OTP");
      } else if (otpCode !== otpValue) {
        toast.error("Incorrect Otp");
      } else {
        if (isForget) {
          setOtpVerified(true);
        } else {
          // 🔐 Backend verification of OTP
          const otpRes = await fetch(
            `https://api.aidfastbd.com/api/Auth/OtpVerified?userId=${user.id}`
          );

          if (otpRes.status === 200) {
            await login(user, user.token);
            localStorage.setItem("token", user?.token);
            localStorage.setItem("id", user?.id);
            setTimeout(() => router.push("/profile"), 1000);
            toast.success("Verification successful. You are now logged in.");
          } else {
            toast.error("OTP Verification failed. Please try again.");
          }
        }
      }
    } catch (err) {
      toast.error(err.message || "Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e) => {
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
          password: password,
          mobileNoOrEmail: user.auth,
        }),
      });

      if (response.ok) {
        toast.success("Password reset successfully!, You can login now.");
        setTimeout(() => router.push("/login"), 1000);
      } else {
        const data = await response.json();
        toast.error(data.message || 'Password reset failed');
      }
    } catch (err) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Toaster position="top-right" />
      <div>
        {otpVerified === true ? <div className="flex flex-col items-center justify-center  pt-4 px-4">
          <div className=" p-6 rounded-lg shadow-lg w-full">
            <p className="text-center text-gray-700 mb-6">Be Happy and be healthy</p>
            <form onSubmit={handleResetSubmit}>
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
          :
          <div className=" bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-2xl shadow-lg">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify OTP</h2>
                <p className="text-gray-600">Please enter the verification code sent to {mobileEmailNo}</p>
              </div>
              <div className="mt-8 space-y-6">
                <div className="flex gap-2 justify-center">
                  {otp.map((data, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      value={data}
                      onChange={(e) => handleChange(e.target, index)}
                      onFocus={(e) => e.target.select()}
                      className="w-12 h-12 border-2 rounded-lg text-center text-xl font-semibold text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200 shadow-sm"
                      aria-label={`Digit ${index + 1} of OTP`}
                    />
                  ))}
                </div>

                {error && (
                  <div className="flex items-center justify-center text-red-500 text-sm">
                    <FiAlertCircle className="mr-1" />
                    {error}
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`w-full py-3 px-4 rounded-lg text-white font-medium ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"} transition-all duration-200 shadow-md transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed flex items-center justify-center`}
                >
                  {loading ? (
                    <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                  ) : null}
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>

              </div>
            </div>
          </div>}
      </div>
    </div>
  );
};

export default OTPVerification;