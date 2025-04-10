'use client';

import { useState } from "react";
import { headerx } from "../utils/constants";

const AccountDeletionForm = ({ token }) => {

    const [reason, setReason] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!reason.trim()) {
            setError("Please provide a reason for account deletion.");
            return;
        }
        headerx['Authorization'] = `Bearer ${token}`;
        const res = await fetch('https://api.aidfastbd.com/api/account/delete', { method: "DELETE", headers: headerx, body: JSON.stringify({ "reason": reason }) });
        if (res.status == 200) {
            setError("");
            alert("Account deletion request submitted.");
            const ret = await fetch("/api/logout", {
                method: "POST", headers: {
                    'Content-Type': 'application/json'
                },
            })

            if (ret.status == 200) {
                window.location.href = "/"
            }
        }
        setError("");
        alert("Account deletion request submitted.");
        // Handle API request to submit the deletion reason
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    Delete Your Account
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block text-gray-700 font-medium">
                        Why do you want to delete your account?
                    </label>
                    <textarea
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                        rows="4"
                        placeholder="Enter your reason..."
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    ></textarea>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200"
                    >
                        Request Deletion
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AccountDeletionForm;
