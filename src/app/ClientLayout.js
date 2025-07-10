'use client';
import { useEffect, useState } from "react";
import Navbar from "../components/layout/nabvar.js";
import Footer from "../components/layout/footer.js";
import I18nProvider from "../context/i18n.js";
import StoreProvider from "./StoreProvider";
import { Toaster } from "sonner";
import { getUserProfile } from "../context/getUserProfile.js";
import Loader from '../context/loader.js'
import { AuthProvider } from "../context/AuthContext.js";
const ClientLayout = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("id");
            if (token && userId) {
                const profile = await getUserProfile(userId, token);
                if (profile?.imageUrl) {
                    setImage("https://api.aidfastbd.com/" + profile.imageUrl);
                }
            }
            setTimeout(() => setLoading(false), 500);
        };

        fetchProfile();
    }, []);

    if (loading) return <Loader />;

    return (
        // <AuthProvider>
        <StoreProvider>
            <I18nProvider>
                <Navbar />
                <Toaster position="top-right" />
                {children}
                <Footer />
            </I18nProvider>
        </StoreProvider>
        // </AuthProvider>
    );
};

export default ClientLayout;
