'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { getUserProfile } from './getUserProfile';
// import { getUserProfile } from '../utils/getUserProfile'; // Adjust path if needed

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Load token and fetch user profile on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('id');

    if (storedToken && storedUserId) {
      setToken(storedToken);
      getUserProfile()
        .then(profile => {
          if (profile) {
            setUser(profile);
          } else {
            setUser(null);
            localStorage.removeItem('token');
            localStorage.removeItem('id');
          }
        })
        .catch(err => {
          console.error("Failed to fetch profile:", err);
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // ✅ Login function — saves token, fetches profile
  const login = async (userData, tokenData) => {
    setToken(tokenData);
    localStorage.setItem('token', tokenData);
    localStorage.setItem('id', userData.id);

    try {
      const profile = await getUserProfile();
      if (profile) {
        setUser(profile);
        toast.success("Login successful");
      } else {
        setUser(null);
        toast.error("Failed to load user profile");
      }
    } catch (err) {
      console.error("Login profile error:", err);
      setUser(null);
      toast.error("Profile fetch failed");
    }
  };

  // 🔒 Logout function
  const logout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
      });

      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      toast.success("Logout successful");
      router.push('/');
    } catch (err) {
      toast.error("Logout failed");
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 📦 Custom hook to use auth anywhere
export const useAuth = () => useContext(AuthContext);
