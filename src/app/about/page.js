import React from 'react'
import AppBar from '../../components/AppBar';
import { FaArrowLeft } from "react-icons/fa";
import { appname } from "../../utils/constants";


export const metadata = {
    title: "About | " + appname,
};

function page() {
    return (
        <>
            <div className="mt-10 aid-container text-gray-800">
                <h2 className="text-2xl font-bold mb-4">Explore Our Healthcare Services</h2>
                <p className="mb-4">
                    AidFast offers a comprehensive suite of healthcare services designed to meet diverse needs with speed and reliability. From general consultations to emergency care, our platform enables users to access essential services seamlessly from any location.
                </p>

                <p className="mb-2"><b>Doctor Appointments:</b> Book consultations with experienced doctors and track your position in the queue in real time.</p>

                <p className="mb-2"><b>Diagnostic Centers & Hospitals:</b> Discover verified diagnostic labs and hospital services for accurate medical tests and treatment.</p>

                <p className="mb-2"><b>Dental Clinics:</b> Access specialized dental care including routine checkups, surgeries, and cosmetic procedures.</p>

                <p className="mb-2"><b>Blood Bank & Donor Club:</b> Find nearby blood banks or connect with registered blood donors in emergency situations.</p>

                <p className="mb-2"><b>Ambulance Services:</b> Request ambulances quickly and ensure immediate patient transportation during critical conditions.</p>

                <p className="mb-2"><b>Pharmacy & Medicine Delivery:</b> Order prescription medicines and healthcare products from certified pharmacies delivered to your door.</p>

                <p className="mb-2"><b>Physiotherapy Centers:</b> Schedule sessions with qualified physiotherapists to support recovery and rehabilitation at home or in centers.</p>

                <p className="mb-2"><b>Eye Care Centers:</b> Book eye checkups and vision care services with trusted eye specialists and clinics.</p>

                <p className="mb-2"><b>Drug Rehabilitation Centers:</b> Access support for substance abuse recovery through trusted de-addiction programs and rehabilitation care.</p>

                <p className="mb-2"><b>Nursing Home Care:</b> Get reliable nursing support and elderly care at home or in registered facilities for ongoing health needs.</p>

                <p className="mb-2"><b>Hearing Aid Centers:</b> Find professional hearing assessments, hearing aids, and hearing care solutions near you.</p>

                <p className="mb-2"><b>Emergency Services:</b> Instantly connect with doctors, ICUs, OTs, blood banks, and ambulances during urgent medical situations.</p>

                <p className="mt-4">
                    Each of these services is integrated into the AidFast platform to simplify healthcare access, build trust between providers and patients, and save lives through faster response and reliable information.
                </p>
            </div>

        </>
    )
}

export default page