'use client';

import { useState } from 'react';
import { panel_base } from '../../utils/constants'

export default function PanelLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const err = {};
    if (!email) {
      err.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      err.email = 'Invalid email address';
    }

    if (!password) {
      err.password = 'Password is required';
    } else if (password.length < 6) {
      err.password = 'Password must be at least 6 characters';
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!validate()) return;

    setIsLoading(true);

    try {
      const response = await fetch(`${panel_base}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 200) {

        const ret = await fetch("/api/panel-login", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            panel_is_admin: data.is_admin,
            panel_token: data.access_token,
          }),
        });



        if (ret.status !== 200) {
          setErrorMsg('Login failed at panel-login step');
        } else {
          window.location.reload();
        }
      } else {
        setErrorMsg(data?.message || 'Invalid login credentials');
      }
    } catch (err) {
      setErrorMsg('Something went wrong: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Panel Login</h2>

        {errorMsg && (
          <p className="text-center text-red-600 bg-red-100 px-3 py-2 rounded">{errorMsg}</p>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            autoComplete="email"
            className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            autoComplete="current-password"
            className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
