"use client";
import React, { useState } from "react";
import { image_base_endpoint } from "../../utils/constants";
import TextTicker from "../TextTicker";
import ReviewList from "../ReviewList";
import { FaPhoneAlt } from "react-icons/fa";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import Image from "next/image";

function DoctorTabs({ data }) {
  const [activeTab, setActiveTab] = useState("Info");
  const formatDate = (dateString) => {
    if (dateString === "Present") return dateString;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  return (
    <>
      <div className="bg-white shadow-md aid-container">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex justify-start space-x-4 pl-4 pr-4 border-b w-full">
            {["Info", "Chamber", "Experience", "Review"].map((tab) => (
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
      <div className="aid-container p-4" style={{ insetBlockEnd: "70px" }}>
        {activeTab === "Info" && (
          <div>
            <h3 className="font-bold text-lg text-black-600">
              {data?.doctorAdditionalInfo?.title}
            </h3>
            <pre className="w-full overflow-x-auto whitespace-pre-wrap">
              {data?.doctorAdditionalInfo?.details}
            </pre>
            {data?.doctorAdditionalInfo?.imageUrl !== null &&
              data?.doctorAdditionalInfo?.imageUrl !== "" && (
                <Image
                alt="Image"
                  width={200}
                  height={200}
                  src={
                    image_base_endpoint + data?.doctorAdditionalInfo?.imageUrl
                  }
                />
              )}
          </div>
        )}

        {activeTab === "Chamber" && (
          <div>
            <h3 className="font-bold text-lg">Chamber Information</h3>
            <div>
              {data?.chamberInformation.map((e, index) => {
                return (
                  <div key={`chamber_${index}`}>
                    <div className="mt-4">
                      <h4 className="font-bold text-lg text-blue-700">
                        {e.name}
                      </h4>

                      <div className="flex items-center justify-start text-left space-x-2 mb-2">
                        {e.location !== null && (
                          <span className="font-bold text-sm">
                            Location: {e.location}
                          </span>
                        )}
                        <Image
                        
                          onClick={() => {
                            const mapUrl = `https://www.google.com/maps?q=${e.lat},${e.lon}`;

                            window.open(mapUrl, "_blank"); // Open in a new tab
                          }}
                          src="/icons/map.png"
                          alt="Map Icon"
                          width={30}
                          height={30}
                        />
                      </div>

                      {e.notice !== null && e.notice !== "" && (
                        <TextTicker text={e.notice}></TextTicker>
                      )}
                      <h4 className="font-bold text-sm text-green-700">
                        Visiting Hours
                      </h4>

                      <div className="overflow-x-auto">
                        <table
                          className="w-full text-sm"
                          aria-label="Chamber Visiting Hours"
                        >
                          <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                              <th className="py-3 px-4 text-left">Day</th>
                              <th className="py-3 px-4 text-left">Day Time</th>
                              <th className="py-3 px-4 text-left">
                                Evening Time
                              </th>
                              <th className="py-3 px-4 text-left">Status</th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-600 text-sm font-light">
                            {e.chamberTimeDetails.map((schedule, index) => (
                              <tr
                                key={`schedule_${index}`}
                                className={`border-b border-gray-200 hover:bg-gray-100`}
                              >
                                <td className="py-3 px-4 text-left">
                                  {schedule.dayName}
                                </td>

                                <td className="py-3 px-4 text-left">
                                  {schedule.dayTime}
                                </td>
                                <td className="py-3 px-4 text-left">
                                  {schedule.eveningTime}
                                </td>
                                <td className="py-3 px-4 text-left">
                                  <span
                                    className={`${
                                      schedule.isOpen
                                        ? "bg-green-200 text-green-600"
                                        : "bg-red-200 text-red-600"
                                    } py-1 px-3 rounded-full text-xs`}
                                  >
                                    {schedule.isOpen ? "Open" : "Closed"}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="mt-4 text-gray-700">
                      <p>
                        <strong>Fee:</strong> {e.fee}
                      </p>
                      <p>
                        <strong>Follow-up:</strong> {e.oldPatient}
                      </p>
                      <p>
                        <strong>Report Showing:</strong> {e.reportShow}
                      </p>
                      <p>
                        <strong>Room No:</strong> {e.room}
                      </p>
                      <p>
                        <strong>Floor:</strong> {e.floor}
                      </p>

                      <div className="mt-2 mb-2">
                        <a
                          href={`tel:${e.phoneNumber}`}
                          className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm flex items-center space-x-2 max-w-fit"
                          style={{ inlineSize: "auto" }}
                        >
                          <FaPhoneAlt />
                          <span>Call Now</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "Experience" && (
          <div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data?.doctorExperiencelInfo.map((experience) => (
                <div
                  key={`experience_${experience.id}`}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  <div className="p-6 cursor-pointer" tabIndex={0}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-xl font-semibold text-gray-800">
                          {experience.officeName}
                        </h3>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-lg font-medium text-gray-700">
                        Designation:{experience.designation}
                      </p>
                      <p className="text-gray-600">
                        Department: {experience.department}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 text-gray-600 mb-2">
                      <FaCalendarAlt />
                      <span>
                        {formatDate(experience.startDate)} -{" "}
                        {formatDate(experience.endtDate)}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-gray-600">
                      <FaClock />
                      <span>{experience.period}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {data?.doctorExperiencelInfo.length === 0 && (
              <div
                className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4"
                role="alert"
              >
                <p className="text-yellow-700">No experience data available.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "Review" && (
          <ReviewList
            reviews={data?.doctorRatingInfo}
            averageRating={data?.averageRating}
            totalRatings={data?.totalRating}
          />
        )}
      </div>
    </>
  );
}

export default DoctorTabs;
