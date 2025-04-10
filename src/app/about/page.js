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
            <AppBar leadingIcon={<FaArrowLeft className="h-5 w-5" />} title='About Us' ></AppBar>

            <div className="pt-16 pl-8 pr-8">
                <p><b>AidFast</b> is designed to ensure quick and easy access to essential healthcare information for everyone. Inspired by the concept of first aid, AidFast provides a seamless platform for users to find and connect with critical health services. With AidFast, users can easily access a wealth of healthcare resources from home, including doctors, diagnostic centers, blood banks, blood donors, pharmacies, and ambulance services. The app enables users to view detailed information and directly connect with these services whenever they need.</p>

                <b>Key Features:</b>
                <p>- **Service Profiles**: Doctors, diagnostic centers, blood banks, pharmacies, and ambulance providers can create their own profiles to enhance their visibility and reach more patients.</p>
                <p> - **Appointment Booking**: Users can conveniently book doctor appointments and check their position in the queue for efficient time management.      </p>

                <p> - **Blood Donation**: Blood donors can register themselves in blood banks, making it easier for those in need to locate suitable donors.        </p>
                <p>- **Emergency Contacts**: For urgent needs, users can quickly reach out to emergency service providers such as doctors, diagnostic centers, blood banks, pharmacies, OT (Operating Theaters), and ICU (Intensive Care Units).   </p>
                <br></br>


                AidFast is committed to making healthcare more accessible and reliable, bridging the gap between patients and healthcare providers in times of need.
            </div>
        </>
    )
}

export default page