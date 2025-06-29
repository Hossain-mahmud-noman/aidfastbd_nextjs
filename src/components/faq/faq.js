'use client'

import { Collapse } from "antd";
import { useState } from "react";
import { FaAngleUp } from "react-icons/fa";
import { IoChevronUpOutline } from "react-icons/io5";
const FAQ = () => {
   const data = [
      {
         key: "1",
         question: "How can I book an ambulance service through AidFastBD?",
         answer: "You can easily book an ambulance by visiting our website or app, selecting your location, and confirming the request with one click."
      },
      {
         key: "2",
         question: "Are the ambulance services available 24/7?",
         answer: "Yes, we provide 24/7 licensed ambulance support throughout Dhaka and other major regions."
      },
      {
         key: "3",
         question: "Can I consult with a doctor online?",
         answer: "Absolutely! Our telemedicine service allows you to consult with licensed doctors from the comfort of your home via video call."
      },
      {
         key: "4",
         question: "Is there any discount on medical services?",
         answer: "Yes, we regularly offer discounts on ambulance, doctor consultations, and diagnostic services. Offers vary based on location and provider."
      },
      {
         key: "5",
         question: "How can I order medicines through AidFastBD?",
         answer: "You can upload your prescription on our platform, and our pharmacy partners will deliver the medicines directly to your doorstep."
      },
      {
         key: "6",
         question: "Are your ambulances properly licensed?",
         answer: "Yes, all ambulances listed on AidFastBD are verified and operated by licensed service providers."
      },
      {
         key: "7",
         question: "Do you provide diagnostic test booking?",
         answer: "Yes, you can schedule lab tests and diagnostics through our platform and receive results online or at your preferred center."
      },
      {
         key: "8",
         question: "Can I cancel a booked service?",
         answer: "Yes, most services can be canceled within a specific time window. Please refer to our cancellation policy for full details."
      },
      {
         key: "9",
         question: "How do I contact customer support?",
         answer: "You can reach our support team via chat, phone, or email for any issues related to bookings or services."
      },
      {
         key: "10",
         question: "Is AidFastBD available outside Dhaka?",
         answer: "Yes, while our core services are strongest in Dhaka, we are rapidly expanding to cover major districts across Bangladesh."
      }
   ];

   const [activeKey, setActiveKey] = useState(1);

   const handlePanelChange = (key) => {
      setActiveKey(key);
   };

   return (
      <section className="mt-10 md:mt-14 lg:mt-20 xl:mt-20 aid-container">
         <div>
            <h1 className="heading1 text-[#1A1A1A] text-center">Frequent Asked Question (FAQ)</h1>
            <p className="description2 text-[#061C3D] text-center max-w-[964px] mx-auto mt-4 lg:mt-5">
               {"Check the information below to get answers to your common questions about our services. We've tried to provide clear and concise explanations for the most common and important queries"}
            </p>
         </div>
         <div className="w-full mt-6 md:mt-7 lg:mt-8 xl:mt-10">
            <Collapse
               accordion
               activeKey={activeKey}
               onChange={handlePanelChange}
               expandIconPosition="end"
               expandIcon={({ isActive }) => (
                  <FaAngleUp size={16} className={`transition-transform duration-300 ${isActive ? "rotate-icon" : ""}`} />
               )}
               className="custom-collapse"
            >
               {data.map((item) => (
                  <Collapse.Panel
                     key={item.key}
                     header={
                        <p className="heading-5 text-[#2B2B2B] ">
                           {item.question}
                        </p>
                     }
                     className={`faq-panel ${activeKey === item.key ? "active" : ""}`}
                  >
                     <p className="px-2 description-1 text-[#44433F]">{item.answer}</p>
                  </Collapse.Panel>
               ))}
            </Collapse>
         </div>
      </section>
   );
};

export default FAQ;
