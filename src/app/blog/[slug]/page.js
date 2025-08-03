
"use client"
import { useParams } from "next/navigation";
import React from "react";

const BlogDetails = () => {
   const { slug } = useParams();


   const blogs = {
      "1": {
         title: "ডেঙ্গু বাড়ছে, সচেতনতা কম!",
         content: (
            <>
               <p>🌧 বর্ষা এলেই বাড়ে ডেঙ্গুর ভয়! বাংলাদেশে প্রতিবছর বর্ষাকালে ডেঙ্গু জ্বর যেনো একটি আতঙ্ক হয়ে দাঁড়ায়। শহর তো বটেই, এখন তো গ্রামগঞ্জেও ডেঙ্গু ছড়িয়ে পড়ছে দ্রুত। আর সবচেয়ে বেশি সমস্যায় পড়ছেন যারা—</p>
               <ul className="list-disc pl-6 space-y-1">
                  <li>রাতে হঠাৎ জ্বর</li>
                  <li>রক্তের প্রয়োজন</li>
                  <li>প্লাটিলেট কমে গেলে হাসপাতাল ছুটোছুটি</li>
               </ul>
               <p className="mt-4">এই পরিস্থিতিতে অনেকে জানেন না:</p>
               <ul className="list-disc pl-6 space-y-1">
                  <li>কোথায় ইমার্জেন্সি ডাক্তার পাবেন?</li>
                  <li>কোন হাসপাতালে ডেঙ্গু টেস্ট হয়?</li>
                  <li>কাছাকাছি রক্তদাতা কোথায় আছেন?</li>
                  <li>অ্যাম্বুলেন্স কাকে কল করবেন?</li>
               </ul>
               <p className="mt-4">🆘 <strong>AidFast:</strong> এক অ্যাপেই মিলবে জরুরি সমাধান। AidFast অ্যাপ এখন ডেঙ্গু পরিস্থিতির জন্য লাইফ সেভার টুল হিসেবে কাজ করছে।</p>
               <ul className="list-disc pl-6 space-y-1">
                  <li>কোথায় ডেঙ্গু টেস্ট হয়?</li>
                  <li>কোন ডাক্তার ডেঙ্গু রোগী দেখেন?</li>
                  <li>কারা প্লাটিলেট বা O+ রক্ত দিতে পারে?</li>
                  <li>কোথায় অ্যাম্বুলেন্স আছে?</li>
               </ul>
               <p>সব প্রশ্নের উত্তর এক অ্যাপে।</p>
               <p className="mt-4">📲 <strong>AidFast-এর ডেঙ্গু মোকাবেলায় রিয়েল-টাইম ফিচার:</strong></p>
               <ul className="list-disc pl-6 space-y-1">
                  <li>লোকেশন অনুযায়ী ডাক্তার ও ক্লিনিক খোঁজার সুবিধা</li>
                  <li>ফ্রি অ্যাম্বুলেন্স ইনফো ও বুকিং সাপোর্ট</li>
                  <li>নিকটবর্তী রক্তদাতার নাম, গ্রুপ ও ফোন নাম্বার</li>
                  <li>যেসব ডায়াগনস্টিক সেন্টারে ডেঙ্গু টেস্ট হয়, তাদের তালিকা</li>
                  <li>সরাসরি ফোনে যোগাযোগের অপশন</li>
               </ul>
               <p className="mt-4">✅ এখনই প্রয়োজন সচেতনতা + প্রযুক্তি। শুধু সচেতনতা নয়, সঠিক সিদ্ধান্ত নেয়ার জন্য দরকার তথ্য। AidFast ঠিক এই কাজটাই করে দিচ্ছে—তথ্য এনে দিচ্ছে আপনার হাতে, স্মার্টফোনের স্ক্রিনে।</p>
               <p className="mt-4">🔗 অ্যাপ ডাউনলোড করুন:</p>
               <ul className="list-disc pl-6 space-y-1">
                  <li>📱 Google Play Store - AidFast App</li>
                  <li>🌐 Website: www.aidfastbd.com</li>
                  <li>📣 ফেসবুক: AidFast Facebook</li>
               </ul>
               <p className="mt-4">🗣 <strong>পরিশেষে:</strong> ডেঙ্গু যেনো ভয় না হয়ে উঠে কেবল সচেতনতায় আর সঠিক সেবায়।</p>
            </>
         ),
      },

      "2": {
         title: "কমিশন, ভুয়া টেস্ট ও দালাল থেকে বাঁচার উপায়",
         content: (
            <>
               <p>কমিশন, ভুয়া টেস্ট ও দালাল থেকে বাঁচার উপায়: সচেতন থাকুন, নিজের সিদ্ধান্ত নিজে নিন।</p>
               <p>📌 <strong>সমস্যা:</strong> স্বাস্থ্যসেবায় দালাল ও প্রতারণা</p>
               <ul className="list-disc pl-6 space-y-1">
                  <li>কেউ হাসপাতালের সামনে দাঁড়িয়ে ভালো ডাক্তার দেখাবো</li>
                  <li>কেউ রোগী ধরে বেসরকারি ক্লিনিকে নিয়ে যায়</li>
                  <li>আবার কেউ এমন সব টেস্ট লিখে দেয় — যা আদৌ প্রয়োজন নেই</li>
               </ul>
               <p>🎯 <strong>সমাধান:</strong> AidFast অ্যাপ ঠিক এই জায়গাতেই সাহায্য করতে এসেছে।</p>
               <p>✅ <strong>আপনি যা যা করলে দালালের ফাঁদ থেকে বাঁচতে পারবেন:</strong></p>
               <ol className="list-decimal pl-6 space-y-2">
                  <li>
                     নিজেই তথ্য জেনে যান
                     <ul className="list-disc pl-6 space-y-1">
                        <li>আপনার এলাকার সব ডাক্তারদের নাম, চেম্বার টাইম ও ফোন নম্বর</li>
                        <li>হাসপাতালের নাম, ঠিকানা ও যোগাযোগ পদ্ধতি</li>
                        <li>কোন ডায়াগনস্টিকে কী টেস্ট হয়, তার দাম কেমন</li>
                     </ul>
                  </li>
                  <li>
                     ভালো টেস্ট না ভুয়া টেস্ট? যাচাই করে নিন
                     <p>AidFast-এর মাধ্যমে আপনি ভালো প্রতিষ্ঠানগুলোর টেস্টের গড় দাম দেখতে পারবেন।</p>
                  </li>
                  <li>দালাল ছাড়াই সেবা দেয়— এমন প্রতিষ্ঠান চিহ্নিত করুন।</li>
                  <li>মধ্যস্থতাকারীর হাত থেকে বাঁচতে সরাসরি ফোন করুন।</li>
                  <li>সচেতনতা ছড়ান। AidFast অ্যাপ ব্যবহার করতে উৎসাহিত করুন।</li>
               </ol>
               <p>📌 <strong>আমাদের প্রতিশ্রুতি:</strong> AidFast কখনো কোনো দালাল বা কমিশন নেয় না।</p>
               <p>📥 <strong>ডাউনলোড করুন AidFast অ্যাপ:</strong> https://play.google.com/store/apps/details?id=com.aidfastbd.app</p>
               <p>📞 <strong>যোগাযোগ করুন:</strong></p>
               <ul className="list-disc pl-6 space-y-1">
                  <li>📧 Email: contact@aidfastbd.com</li>
                  <li>📱 ফেসবুক পেইজ: facebook.com/aidfast</li>
               </ul>
               <p>🧠 মনে রাখবেন: অপরিচিত কেউ ভালো চিকিৎসার কথা বললে, সন্দেহ করুন। AidFast জানাবে — কোথায় পাবেন সঠিক সেবা।</p>
            </>
         ),
      },

      "3": {
         title: "স্বাস্থ্যসেবায় খরচ কমানোর সহজ উপায় ও সচেতনতার গুরুত্ব",
         content: (
            <>
               <p>স্বাস্থ্যসেবা মানুষের মৌলিক অধিকার হলেও, আমাদের দেশে এটি এখন অনেকের জন্য দুশ্চিন্তার কারণ হয়ে দাঁড়িয়েছে। কারণ কী?</p>
               <h4 className="font-semibold mt-4">💸 অপ্রয়োজনীয় খরচ যেসব কারণে হয়:</h4>
               <ul className="list-disc pl-6 space-y-1">
                  <li>দালাল বা মধ্যস্বত্বভোগীর মাধ্যমে চিকিৎসা নেওয়া</li>
                  <li>ভুয়া বা অপ্রয়োজনীয় টেস্ট করা</li>
                  <li>ভুল জায়গায় রেফার করা</li>
                  <li>গোপনে কমিশনভিত্তিক ডাক্তার</li>
                  <li>অস্পষ্ট তথ্যের কারণে ভুল সিদ্ধান্ত</li>
               </ul>
               <p className="mt-4">এতে শুধু টাকা নয়, সময় ও মানসিক চাপ — দুটোই বেড়ে যায়। কিন্তু একটু সচেতন হলে আপনি অনেকটাই সাশ্রয় করতে পারবেন।</p>

               <h4 className="font-semibold mt-4">✅ খরচ কমানোর ৫টি কার্যকর কৌশল:</h4>
               <ol className="list-decimal pl-6 space-y-2">
                  <li><strong>তথ্য জেনে চিকিৎসা শুরু করুন:</strong> AidFast-এ আপনি আগেই দেখে নিতে পারেন।</li>
                  <li><strong>মধ্যস্বত্বভোগীর প্রভাব এড়ান:</strong> নিজ সিদ্ধান্তে দালাল এড়িয়ে চলুন।</li>
                  <li><strong>ভুয়া টেস্ট চিনুন:</strong> AidFast রেজিস্টার্ড প্রতিষ্ঠানের তথ্য দেখায়।</li>
                  <li><strong>নিজের পছন্দে প্রতিষ্ঠান বেছে নিন:</strong> রেফার ছাড়াই সিদ্ধান্ত নিন।</li>
                  <li><strong>প্রযুক্তি ব্যবহার করুন:</strong> ২৪/৭ সেবা, রক্ত, অ্যাম্বুলেন্স, ওষুধ বুকিং করুন।</li>
               </ol>

               <h4 className="font-semibold mt-4">📉 AidFast কিভাবে খরচ কমায়?</h4>
               <table className="table-auto border border-gray-300 mt-2">
                  <thead>
                     <tr>
                        <th className="border px-2 py-1">সেবা</th>
                        <th className="border px-2 py-1">AidFast-এ সুবিধা</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td className="border px-2 py-1">ডাক্তার খোঁজা</td>
                        <td className="border px-2 py-1">ফ্রি তথ্য, সরাসরি যোগাযোগ</td>
                     </tr>
                     <tr>
                        <td className="border px-2 py-1">রক্তের প্রয়োজন</td>
                        <td className="border px-2 py-1">রক্তদাতার তথ্য সরাসরি পাওয়া যায়</td>
                     </tr>
                     <tr>
                        <td className="border px-2 py-1">টেস্ট বুকিং</td>
                        <td className="border px-2 py-1">প্রাইস কমপ্যারিজন ও ডিসকাউন্ট</td>
                     </tr>
                     <tr>
                        <td className="border px-2 py-1">অ্যাম্বুলেন্স</td>
                        <td className="border px-2 py-1">ট্রান্সপারেন্ট চার্জ, দালাল ছাড়া</td>
                     </tr>
                     <tr>
                        <td className="border px-2 py-1">ওষুধ অর্ডার</td>
                        <td className="border px-2 py-1">ডিসকাউন্ট ও হোম ডেলিভারি</td>
                     </tr>
                  </tbody>
               </table>

               <h4 className="font-semibold mt-4">🔔 সচেতনতার গুরুত্ব:</h4>
               <p>“আপনি যদি না জানেন, অন্য কেউ আপনার হয়ে সিদ্ধান্ত নেবে — যেটা হয়তো আপনার জন্য ভালো হবে না।”</p>
               <p>AidFast আপনাকে তথ্য দিয়ে ক্ষমতায়িত করে — যেন আপনি নিজেই সিদ্ধান্ত নিতে পারেন।</p>

               <h4 className="font-semibold mt-4">📲 এখনই ডাউনলোড করুন AidFast অ্যাপ:</h4>
               <ul className="list-disc pl-6 space-y-1">
                  <li><a href="https://play.google.com/store/apps/details?id=com.aidfastbd.app" target="_blank" rel="noopener noreferrer">Play Store</a></li>
                  <li>ওয়েবসাইট: <a href="https://www.aidfastbd.com" target="_blank" rel="noopener noreferrer">www.aidfastbd.com</a></li>
               </ul>

               <h4 className="font-semibold mt-4">🧠 মনে রাখুন:</h4>
               <p>স্বাস্থ্যসেবায় প্রতিটি সিদ্ধান্তে সচেতনতা আনলে সেবাটাও হবে নির্ভরযোগ্য, সাশ্রয়ী আর ঝুঁকিমুক্ত।</p>
               <p>আপনার স্বাস্থ্য, আপনার হাতেই — AidFast-এর সাথে আরও সহজভাবে।</p>
            </>
         ),
      }
   };



   const blog = blogs[slug];

   if (!blog) {
      return <p>Blog not found.</p>;
   }

   return (
      <div className="aid-container mt-5 md:mt-8 lg:mt-10">
         <h1>{blog.title}</h1>
         <div>{blog.content}</div>
      </div>
   );
};

export default BlogDetails;
