'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('id');
        const storedToken = localStorage.getItem('token');
        if (storedUser && storedToken) {
            setUser(storedUser);
            setToken(storedToken);
        }

        setLoading(false);
    }, []);


    const login = (userData, tokenData) => {
        setUser(userData);
        setToken(tokenData);
        localStorage.setItem('id', JSON.stringify(userData));
        localStorage.setItem('token', tokenData);
        toast.success("Login successful");
    };

    const logout = async () => {
        try {
            await fetch("/api/logout", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
            });

            setUser(null);
            setToken(null);
            localStorage.removeItem('id');
            localStorage.removeItem('token');
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

// Custom hook
export const useAuth = () => useContext(AuthContext);
