'use client';
import React, { useEffect, useState } from "react";
import AppointmentCard from "../../components/card/AppointmentCard";

export default function AppointmentClient({ token, userId }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch(
          `https://api.aidfastbd.com/api/GeneralInformation/GetAllBookAppointmentList?IsCanceled=false&userId=${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching appointments", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [token, userId]);

  if (loading) {
    return <div className="text-center py-10">Loading appointments...</div>;
  }

  if (data.length === 0) {
    return <div className="text-center py-10">Sorry! No appointments found.</div>;
  }

  return (
    <div className="space-y-4">
      {data.map((e, index) => (
        <AppointmentCard key={index} data={e} token={token} />
      ))}
    </div>
  );
}
