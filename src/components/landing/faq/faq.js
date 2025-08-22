'use client'

import { useI18n } from "../../../context/i18n";
import { Collapse } from "antd";
import { useState } from "react";
import { FaAngleUp } from "react-icons/fa";
import { IoChevronUpOutline } from "react-icons/io5";
const FAQ = () => {
   const i18n = useI18n()
   const data = [
      {
         key: "faq_1",
         question: i18n.t("AidFast কী?"),
         answer: i18n.t("AidFast হলো একটি মোবাইল অ্যাপ ও ওয়েবসাইট, যেখানে আপনি সহজে ডাক্তার, হাসপাতাল, ডায়াগনস্টিক সেন্টার, এম্বুলেন্স, ডেন্টাল ক্লিনিক, রক্তদাতা সহ সকল স্বাস্থ্যসেবার তথ্য এক জায়গায় পাবেন ও যোগাযোগ করতে পারবেন। ফোন দিয়ে সরাসরি ডাক্তারের সিরিয়াল ও অগ্রিম এপয়েন্টমেন্ট নিতে পারবেন।")
      },
      {
         key: "faq_9",
         question: i18n.t("AidFast কাদের জন্য?"),
         answer: i18n.t("AidFast মূলত সাধারণ মানুষ, রোগী, ডাক্তার, হাসপাতাল, ক্লিনিক, ডায়াগনস্টিক সেন্টার, রক্তদাতা ও স্বাস্থ্যসেবা প্রদানকারীদের জন্য। যারা স্বাস্থ্যসেবা খুঁজছেন এবং যারা স্বাস্থ্যসেবা দিচ্ছেন—দুই পক্ষই এই প্ল্যাটফর্ম থেকে উপকৃত হবেন। যোগাযোগ সহজ ও ঝামেলাবিহীন হবে।")
      },
      {
         key: "faq_10",
         question: i18n.t("AidFast অ্যাপ কীভাবে ডাউনলোড করবো?"),
         answer: i18n.t("আপনি Play Store-এ গিয়ে লিখুন \"AidFast\" – তারপর ইনস্টল করুন। অথবা সরাসরি ক্লিক করুন 👉 https://play.google.com/store/apps/details?id=com.aidfastbd.app")
      },
      {
         key: "faq_6",
         question: i18n.t("AidFast-এ কীভাবে রেজিস্ট্রেশন করবো?"),
         answer: i18n.t("(ডাক্তার/হাসপাতাল/ডায়াগনস্টিক সেন্টার ও অন্যান্য স্বাস্থ্যসেবা প্রদানকারীগণের জন্য) খুব সহজ! আপনি নিজেই রেজিষ্ট্রেশন করতে পারেন অথবা, আমাদের টিম ফোনে বা সরাসরি গিয়ে রেজিস্ট্রেশন করতে আপনাকে গাইড করবে। আপনি [Contact Us] পেইজ থেকে আমাদের সঙ্গে যোগাযোগ করতে পারেন অথবা, ওয়েবসাইটের নিচে দেওয়া ফর্ম পূরণ করতে পারেন। যোগাযোগ :01338988734। তাহলে, আমাদের প্রতিনিধিগণ আপনার সাথে খুব শিঘ্রই যোগাযোগ করবেন।")
      },
      {
         key: "faq_12",
         question: i18n.t("AidFast অ্যাপে কীভাবে সিরিয়াল নিবো?"),
         answer: i18n.t("প্রতিটি ডাক্তারের প্রোফাইলে সিরিয়াল নেওয়ার জন্য ফোন নম্বর দেওয়া আছে। আপনি সরাসরি ফোন করে সিরিয়াল নিতে পারবেন। অথবা এপয়েন্টমেন্ট অংশ থেকে অগ্রিম এপয়েন্টমেন্ট নিতে পারবেন। অগ্রিম এপয়েন্টমেন্ট অংশ থেকে এপয়েন্টমেন্ট নিলে প্রতিষ্ঠান আপনাকে ফোন করে এপয়েন্টমেন্ট কনফার্ম করবেন।")
      },
      {
         key: "faq_18",
         question: i18n.t("আমি কীভাবে এম্বুলেন্স খুঁজবো?"),
         answer: i18n.t("\"এম্বুলেন্স\" সেকশনে গিয়ে আপনি আপনার এলাকার সব অ্যাম্বুলেন্স সেবার তথ্য ও নম্বর দেখতে পারবেন।")
      },
      {
         key: "faq_2",
         question: i18n.t("AidFast অ্যাপ দিয়ে আমি কী কী করতে পারবো?"),
         answer: i18n.t("আপনি পারবেন – প্রয়োজনীয় মুহুর্তে আপনার এলাকার ডাক্তার খুঁজে বের করতে, হাসপাতাল, ক্লিনিক, ডায়াগনস্টিক সেন্টার খুঁজতে, সরাসরি কল করে সিরিয়াল নিতে, কাছাকাছি ব্লাড ব্যাংক ও রক্তদাতা খুঁজে পেতে, জরুরি এম্বুলেন্স পেতে। এছাড়াও মাত্র এক ক্লিকেই পাবেন আপনার পছন্দের লোকেশনের প্রয়োজনীয় সকল স্বাস্থ্যসেবা তথ্য।")
      },
       {
         key: "faq_14",
         question: i18n.t("AidFast অ্যাপে রক্ত খোঁজার সিস্টেম কেমন?"),
         answer: i18n.t("আপনি শুধু রক্তের গ্রুপ ও আপনার লোকেশন নির্বাচন করলেই কাছাকাছি থাকা, ব্লাড ব্যাংক, রক্তদাতাদের নাম ও মোবাইল নাম্বার পেয়ে যাবেন। এতে রক্ত খোঁজা অনেক সহজ ও দ্রুত হয়।")
      },
      {
         key: "faq_7",
         question: i18n.t("আমি রক্তদাতা হতে চাই। AidFast-এ কীভাবে যুক্ত হবো?"),
         answer: i18n.t("রক্তদাতা হিসেবে যুক্ত হতে চাইলে অ্যাপে ঢুকে আপনার নিকটস্থ ব্লাড ডোনার সংঘটনের “রক্তদাতা যোগ করুন” অপশন নির্বাচন করুন। তারপর আপনার নাম, ব্লাড গ্রুপ ও যোগাযোগ নম্বর দিলে আপনি রক্তদাতা হিসেবে যুক্ত হয়ে যাবেন।")
      },      
      {
         key: "faq_19",
         question: i18n.t("Aidfast অ্যাপ কেন প্রয়োজন?"),
         answer: i18n.t("জরুরি সময়ে অনেকেই জানেন না কাছাকাছি কোথায় ডাক্তার, হাসপাতাল বা অ্যাম্বুলেন্স পাওয়া যাবে। AidFast এই সমস্যার সমাধান করে — মাত্র কয়েক ক্লিকেই আপনার প্রয়োজনীয় স্বাস্থ্যসেবা আপনার হাতের মুঠোয় এনে দেয়।")
      },
   ];


   const [activeKey, setActiveKey] = useState(1);

   const handlePanelChange = (key) => {
      setActiveKey(key);
   };

   return (
      <section className="mt-10 md:mt-14 lg:mt-20 xl:mt-20 aid-container">
         <div>
            <h1 className="heading1 text-[#1A1A1A] text-center">{i18n.t("Frequent Asked Question (FAQ)")}</h1>
            <p className="description2 text-[#061C3D] text-center max-w-[964px] mx-auto mt-4 lg:mt-5">
               {i18n.t("FAQ Description")}
            </p>
         </div>
         <div className="w-full mt-6 md:mt-7 lg:mt-8 xl:mt-10">
            <Collapse
               accordion
               activeKey={activeKey}
               onChange={handlePanelChange}
               expandIconPosition="end"
               expandIcon={({ isActive }) => (
                  <FaAngleUp size={16} className={`transition-transform xl:!mt-5 lg:!mt-4 md:!mt-3 !mt-2 duration-300 ${isActive ? "rotate-icon" : ""}`} />
               )}
               className="custom-collapse"
            >
               {data.map((item) => (
                  <Collapse.Panel
                     key={item.key}
                     header={
                        <p className="description2 text-[#212121] xl:p-5 lg:p-4 md:p-3 p-2">
                           {item.question}
                        </p>
                     }
                     className={`faq-panel ${activeKey === item.key ? "active" : ""}`}
                  >
                     <p className="xl:p-5 lg:p-4 md:p-3 p-2 description1 text-[#212121]">{item.answer}</p>
                  </Collapse.Panel>
               ))}
            </Collapse>
         </div>
      </section>
   );
};

export default FAQ;
