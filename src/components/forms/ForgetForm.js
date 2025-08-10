'use client';
import React, { useState } from 'react';
import OTPVerification from './OTPVerification';
import { useI18n } from '../../context/i18n';

const ForgetForm = () => {
   const i18n = useI18n()
   const [mobileNo, setMobileNo] = useState('');
   const [isSuccessed, setIsSuccessed] = useState(null);
   const [otpCode, setOtpCode] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState('');

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setIsLoading(true);

      try {
         const response = await fetch('https://api.aidfastbd.com/api/Auth/ForgotPassword', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mobileNo }),
         });

         const data = await response.json();

         if (response.status === 200) {

            setOtpCode(data.message);
            setIsSuccessed({
               auth: mobileNo,
               id: data.id,
               isSmsSend: 1,
               status: 1,
               isSmsVerified: 1,
               imageUrl: "https://api.aidfastbd.com/",
               isPatient: false,
               token: data.token,
            });
            toast.success("OTP sent successfully!");


         } else {
            setError(data.message || 'OTP send failed');
            toast.error("Something went wrong!");
         }
      } catch (error) {
         setError('Failed to connect to the server.');
         toast.error("Failed to connect to the server.");
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div>
         {isSuccessed === null ? (
            <div className="flex flex-col items-center justify-center pt-4 px-4">
               <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                  <p className="text-center text-gray-700 mb-6">{i18n.t("Be Happy and be healthy")}</p>

                  <form onSubmit={handleSubmit}>
                     <div className="mb-4 relative">
                        <input
                           type="text"
                           value={mobileNo}
                           onChange={(e) => setMobileNo(e.target.value)}
                           placeholder={i18n.t("Enter email or phone number")}
                           className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                           required
                        />
                     </div>

                     <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200 disabled:opacity-50"
                        disabled={isLoading}
                     >
                        {isLoading ? "Submitting..." : i18n.t("Submit")}
                     </button>

                     {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                  </form>
               </div>
            </div>
         ) : (
            <>

               <OTPVerification isForget={true} user={isSuccessed} otpCode={otpCode} />
            </>
         )}

      </div>
   );
};

export default ForgetForm;
