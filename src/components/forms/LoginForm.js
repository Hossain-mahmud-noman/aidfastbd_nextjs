'use client';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { base_endpoint } from '../../utils/constants';
import { toast, Toaster } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { useI18n } from '../../context/i18n';

const LoginForm = ({ slug = null, id = null }) => {
  const { login } = useAuth();
  const i18n = useI18n()
  const [showPassword, setShowPassword] = useState(false);
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(base_endpoint + '/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
        },
        body: JSON.stringify({
          mobileNo,
          password,
        }),
      });

      const data = await response.json();
      if (response.status == 200) {
        if (data['tokenString'] !== "INVALID") {
          const payload = data['user'];
          payload['mobileNoOrEmail'] = mobileNo;

          const ret = await fetch("/api/login", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user: payload,
              token: data['tokenString']
            })
          });

          if (ret.status == 200) {
            login(data.user, data.tokenString);
            localStorage.setItem("token", data.tokenString);
            localStorage.setItem("id", data.user?.id);
            if (slug) {
              setTimeout(() => router.push(`/${slug}/${id}`), 1000);
            }
            else{
              setTimeout(() => router.push("/profile"), 1000);
            }

          } else {
            toast.error("Login failed");
            setError('Login failed');
          }
        } else {
          toast.error("Login failed");
          setError('Login failed');
        }
      }
      else {
        toast.error("Login failed");
        setError('Login failed');
      }


    } catch (err) {
      toast.error(err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-[500px] mx-auto flex flex-col items-center justify-center p-4 rounded-lg shadow-custom-light mt-6">
        <div className=" bg-white p-6 rounded-lg w-full">
          <p className="text-center text-primary text-xl font-semibold mb-6">{i18n.t("With the best healthcare providers")}</p>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="text"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                placeholder={i18n.t("Enter email or phone number")}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

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
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5 text-gray-400" />
                ) : (
                  <FaEye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-sm mb-4">{error}</p>
            )}

            <div className="text-right my-4">
              <a href="/forget-password" className="text-primary text-lg font-semibold hover:underline">
                {i18n.t("Forget Password?")}
              </a>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full p-3 rounded-lg text-white ${isLoading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                } transition duration-200`}
            >
              {isLoading ? 'Logging in...' : i18n.t("login")}
            </button>
          </form>

          <div className="text-center my-4">
            <a href="/sms-login" className="text-blue-500 hover:underline">
              {i18n.t("Login by using mobile number")}
            </a>
          </div>

          <p className="text-center my-4">
           {i18n.t("Don't Have Account?")}
            <a href="/registration" className="text-blue-500 hover:underline ml-2">
              {i18n.t("Registration")}
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
