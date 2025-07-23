// utils/getUserProfile.js

export const getUserProfile = async () => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('id')
    try {
        const res = await fetch(
            `https://api.aidfastbd.com/api/Auth/GetAllUserProfile?userId=${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (res.ok) {
            const data = await res.json();
            return data[0];
        } else {
            throw new Error(`Failed to fetch profile. Status: ${res.status}`);
        }
    } catch (err) {
        console.error("getUserProfile error:", err);
        return null;
    }
};
