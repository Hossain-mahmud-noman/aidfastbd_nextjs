"use client";
import React, { useState } from "react";
import { image_base_endpoint } from "../../utils/constants";
import ReviewList from "../ReviewList";
import { FaPhone, FaUserCircle, FaTint } from "react-icons/fa";
import Image from "next/image";
function BloodTabs({ data }) {
  const [activeTab, setActiveTab] = useState("Info");
  return (
    <>
      <div className="bg-white">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex justify-start border-b w-full">
            {["Info", "Services", "Donor List", "Review"].map((tab) => (
              <button
                key={tab}
                className={`text-sm font-semibold whitespace-nowrap p-3 ${
                  activeTab === tab
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Conditionally Render Tab Content */}
      <div className="mb-[70px] mt-6">
        {activeTab === "Info" && (
          <div>
            {data?.bloodBankAdditionalInfo !== null && (
              <>
                {" "}
                <h3 className="font-bold text-lg text-black-600">
                  {data?.bloodBankAdditionalInfo?.title}
                </h3>
                <pre className="w-full overflow-x-auto whitespace-pre-wrap">
                  {data?.bloodBankAdditionalInfo?.details}
                </pre>
                {data?.bloodBankAdditionalInfo?.imageUrl !== null &&
                  data?.bloodBankAdditionalInfo?.imageUrl !== "" && (
                    <div className="w-full mt-3">
                      <Image
                        width={1000}
                        height={1000}
                        alt="Image"
                        className="w-full object-fill h-[300px] sm:h-[350px] md:h-[400px] lg:h-[650px] xl:h-[700px]"
                        src={
                          image_base_endpoint +
                          data?.bloodBankAdditionalInfo?.imageUrl
                        }
                      />
                    </div>
                  )}
              </>
            )}
          </div>
        )}
        {activeTab === "Services" && (
          <div>
            {data?.bloodBankServices !== null && (
              <table
                className="w-full border-collapse table-auto"
                role="table"
                aria-label="Services Table"
              >
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th
                      className="p-4 text-left border rounded-tl-lg cursor-pointer hover:bg-blue-600 transition-colors"
                      role="columnheader"
                    >
                      SL
                    </th>
                    <th
                      className="p-4 text-left border cursor-pointer hover:bg-blue-600 transition-colors"
                      role="columnheader"
                    >
                      Service Name
                    </th>
                    <th
                      className="p-4 text-left border rounded-tr-lg cursor-pointer hover:bg-blue-600 transition-colors"
                      role="columnheader"
                    >
                      Quantity
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.bloodBankServices.map((service, index) => {
                    const id = index + 1;
                    return (
                      <tr
                        key={id}
                        className="hover:bg-gray-50 focus-within:bg-gray-50 transition-colors"
                        role="row"
                      >
                        <td className="p-4 border" role="cell">
                          {id}
                        </td>
                        <td className="p-4 border" role="cell">
                          {service.serviceName}
                        </td>
                        <td className="p-4 border" role="cell">
                          {service.price}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            {data?.bloodBankServices !== null &&
              data?.bloodBankServices.length === 0 && (
                <div
                  className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4"
                  role="alert"
                >
                  <p className="text-yellow-700">No Services data available.</p>
                </div>
              )}
          </div>
        )}
        {activeTab === "Donor List" && (
          <div className="space-y-4">
            {data?.bloodBankDonerInfo.map((donor) => (
              <div
                key={donor.id}
                className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
                role="article"
                aria-label={`Donor ${donor.name} with blood group ${donor.bloodGroup}`}
                tabIndex="0"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-gray-600">
                      <FaUserCircle className="w-10 h-10" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-gray-800">
                        {donor.name}
                      </h2>
                      <div className="flex items-center mt-1">
                        <FaPhone className="w-4 h-4 text-gray-500 mr-1" />
                        <p className="text-sm text-gray-600">
                          {donor.mobileNo}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-red-50 to-red-100">
                    <div className="flex items-center space-x-1">
                      <FaTint className="w-4 h-4 text-red-500" />
                      <span className="text-sm font-bold text-red-500">
                        {donor.bloodGroup}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Review" && (
          <ReviewList
            reviews={data?.bloodBankReview}
            averageRating={data?.averageRating}
            totalRatings={data?.totalRating}
          />
        )}
      </div>
    </>
  );
}

export default BloodTabs;
