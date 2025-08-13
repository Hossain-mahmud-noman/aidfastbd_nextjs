'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from 'sonner';
import handleLogout from '../../context/logout';
import { useI18n } from '../../context/i18n';


const ResetForm = ({ user }) => {
   const router = useRouter();
   const i18n = useI18n()
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [error, setError] = useState('');
   const [isLoading, setIsLoading] = useState(false);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');

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
               password,
               mobileNoOrEmail: user.mobileNoOrEmail,
            }),
         });

         const result = await response.json();

         if (response.ok) {
            toast.success("Password reset successfully. Please login again.");
            await new Promise((res) => setTimeout(res, 800)); // Optional delay
            handleLogout(router);
         } else {
            setError(result?.message || 'Password reset failed');
         }

      } catch (err) {
         setError('An error occurred. Please try again.');
         console.error(err);
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className="flex flex-col items-center justify-center pt-4 px-4">
         <div className="bg-white p-6 rounded-lg shadow-custom-light w-full max-w-md mx-auto">
            <p className="text-center text-gray-700 mb-6">{i18n.t("Be Happy and be healthy")}</p>

            <form onSubmit={handleSubmit}>
               {/* Password Field */}
               <div className="mb-4 relative">
                  <input
                     type={showPassword ? "text" : "password"}
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     placeholder={i18n.t("Enter password")}
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

               {/* Confirm Password Field */}
               <div className="mb-4 relative">
                  <input
                     type={showConfirmPassword ? "text" : "password"}
                     value={confirmPassword}
                     onChange={(e) => setConfirmPassword(e.target.value)}
                     placeholder={i18n.t("Confirm password")}
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

               {/* Error Message */}
               {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

               {/* Submit Button */}
               <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full p-3 rounded-lg text-white ${isLoading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} transition duration-200`}
               >
                  {isLoading ? 'Submitting...' : i18n.t("Submit")}
               </button>
            </form>
         </div>
      </div>
   );
};

export default ResetForm;
