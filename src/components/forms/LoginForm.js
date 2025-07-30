'use client';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { base_endpoint } from '../../utils/constants';
import { toast, Toaster } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

const LoginForm = () => {
  const { login } = useAuth();
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
            setTimeout(() => router.push("/profile"), 1000);
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
      <Toaster position="top-right" />
      <div className="max-w-[500px] mx-auto flex flex-col items-center justify-center p-4 rounded-lg shadow-custom-light mt-6">
        <div className=" bg-white p-6 rounded-lg w-full">
          <p className="text-center text-gray-700 mb-6">With the best healthcare providers</p>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="text"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                placeholder="Enter email or phone number"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
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

            <div className="text-right mb-2">
              <a href="/forget-password" className="text-blue-500 hover:underline">
                Forget Password?
              </a>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full p-3 rounded-lg text-white ${isLoading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                } transition duration-200`}
            >
              {isLoading ? 'Logging in...' : 'LOGIN'}
            </button>
          </form>

          <div className="text-center mt-2 mb-2">
            <a href="/sms-login" className="text-blue-500 hover:underline">
              Login by using mobile number
            </a>
          </div>

          <p className="text-center mt-4">
            Don{"'"}t have an account?{' '}
            <a href="/registration" className="text-blue-500 hover:underline">
              Registration
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
