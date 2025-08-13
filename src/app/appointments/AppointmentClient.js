'use client';
import React, { useEffect, useState } from "react";
import AppointmentCard from "../../components/card/AppointmentCard";
import { useAuth } from "../../context/AuthContext";
import AppBar from "../../components/AppBar";
import { FaArrowLeft } from "react-icons/fa6";
import { useI18n } from "../../context/i18n";

export default function AppointmentClient() {
  const { user, token } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const i18n = useI18n()

  const fetchAppointments = async () => {
    try {
      const res = await fetch(
        `https://api.aidfastbd.com/api/GeneralInformation/GetAllBookAppointmentList?IsCanceled=false&userId=${user.userId}`,
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

  useEffect(() => {
    if (user && token) fetchAppointments();
  }, [token, user]);

  if (loading) {
    return <div className="text-center py-10">Loading appointments...</div>;
  }

  if (data.length === 0) {
    return <div className="text-center py-10">Sorry! No appointments found.</div>;
  }


  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todaysAppointments = data.filter((item) => {
    const apptDate = new Date(item.appointmentDate);
    apptDate.setHours(0, 0, 0, 0);
    return apptDate.getTime() === today.getTime();
  });

  const previousAppointments = data.filter((item) => {
    const apptDate = new Date(item.appointmentDate);
    apptDate.setHours(0, 0, 0, 0);
    return apptDate.getTime() < today.getTime();
  });

  const upcomingAppointments = data.filter((item) => {
    const apptDate = new Date(item.appointmentDate);
    apptDate.setHours(0, 0, 0, 0);
    return apptDate.getTime() > today.getTime();
  });

  return (
    <div className="aid-container">
      <AppBar leadingIcon={<FaArrowLeft className="h-5 w-5" />} title={i18n.t("Appointment")} />

      <div className="space-y-6 lg:space-y-10 mt-6">
        {
          todaysAppointments.length > 0 &&
          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-300 pb-2 text-gray-800">
              {"Today's Appointments"}
            </h2>
            <div className="space-y-4">
              {todaysAppointments.map((appt) => (
                <AppointmentCard key={appt.id} data={appt} token={token} />
              ))}
            </div>
          </section>
        }
        {
          upcomingAppointments.length > 0 &&
          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-300 pb-2 text-gray-800">
              Upcoming Appointments
            </h2>
            <div className="space-y-4">
              {upcomingAppointments.map((appt) => (
                <AppointmentCard key={appt.id} data={appt} token={token} />
              ))}
            </div>
          </section>
        }

        {
          previousAppointments.length > 0 &&
          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-300 pb-2 text-gray-800">
              Previous Appointments
            </h2>
            <div className="space-y-4">
              {previousAppointments.map((appt) => (
                <AppointmentCard
                  key={appt.id}
                  data={appt}
                  token={token}
                  isHistory={true}
                />
              ))}
            </div>
          </section>
        }
      </div>
    </div>
  );
}
