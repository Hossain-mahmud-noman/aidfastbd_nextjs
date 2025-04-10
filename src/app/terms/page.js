import React from 'react'
import AppBar from '../../components/AppBar';
import { FaArrowLeft } from "react-icons/fa";
import { appname } from "../../utils/constants";


export const metadata = {
  title: "Terms and Condition | " + appname,
};

function page() {
    return (
        <>
            <AppBar leadingIcon={<FaArrowLeft className="h-5 w-5" />} title='Terms and Condition' ></AppBar>

            <div className="pt-16 pl-8 pr-8">
                <b>1. Acceptance of Terms</b>
                <p>By using AidFastBD.com, you confirm that you are at least 18 years of age or have the consent of a parent or guardian. Your use of the Website indicates your acceptance of these Terms, which may be updated periodically. Please check back regularly for updates.</p>

                <b>2. Service Overview</b>
                <p>AidFastBD.com provides a platform for accessing health services, including consultations, health assessments, and other health-related resources. Our services are intended for informational and consultation purposes only and are not a substitute for professional medical advice, diagnosis, or treatment.</p>

                <b>3. User Account and Registration</b>
                <p>To access some of our services, you may be required to register and create an account. By registering, you agree to:
                    <br></br>

                    Provide accurate and complete information.
                    Keep your account information secure and confidential.
                    Be solely responsible for any activities under your account.</p>
                <b>4. Use of Services</b>
                <p> You agree to use our Service solely for lawful and personal purposes. You shall not:

                    Use our services for any illegal activities or to harm, abuse, or harass others.
                    Attempt to disrupt our services or gain unauthorized access to our systems.</p>
                <b> 5. Health Disclaimer</b>
                <p>AidFastBD.com offers health-related services and information, which are for general informational purposes only. Our platform is not a substitute for professional medical advice, diagnosis, or treatment. Always seek advice from qualified healthcare providers before making any medical decisions. AidFastBD.com disclaims all responsibility for any adverse consequences resulting from the use of our Service.</p>

                <b>                6. Intellectual Property
                </b>               <p> All content, design, and functionality on AidFastBD.com, including code, text, graphics, and logos, are the property of AidFastBD.com or our licensors and are protected by copyright and trademark laws. You may not reproduce, distribute, or modify any materials without our express written permission.</p>

               <b> 7. Privacy Policy</b>
                <p>We respect your privacy. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.</p>
                <b>8. Limitation of Liability</b>
                <p> AidFastBD.com and its affiliates shall not be liable for any damages arising from your use of our Service, including but not limited to direct, indirect, incidental, consequential, or punitive damages. This limitation applies to any health-related information or consultations obtained through our platform.</p>

                <b>9. Termination</b>
                <p>We reserve the right to suspend or terminate your access to AidFastBD.com at our sole discretion, with or without notice, for any violation of these Terms.
                </p>

                <b>10. Changes to Terms</b>
                <p>We may update these Terms at any time. Continued use of the Service after any changes constitutes acceptance of the new Terms. Please check back regularly to stay informed.</p>


            </div>
        </>
    )
}

export default page