"use client";
import React, { useState } from "react";
import ReviewList from "../ReviewList";
import DoctorCard from "../DoctorCard";
import Image from "next/image";
function DentalTabs({ data }) {
  const [activeTab, setActiveTab] = useState("Info");
  return (
    <>
      <div className="bg-white shadow-md">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex justify-start space-x-4 pl-4 pr-4 border-b w-full">
            {["Info", "Doctors", "Services", "Review"].map((tab) => (
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
      <div className="p-4 mb-[70px]">
        {activeTab === "Info" && (
          <div>
            {data?.genericServiceInfos !== null && (
              <>
                {" "}
                <h3 className="font-bold text-lg text-black-600">
                  {data?.genericServiceInfos?.[0]?.title}
                </h3>
                <pre className="w-full overflow-x-auto whitespace-pre-wrap">
                  {data?.genericServiceInfos?.[0]?.details}
                </pre>
                {data?.genericServiceInfos?.[0]?.imgList !== null &&
                  data?.genericServiceInfos?.[0]?.imgList?.map((e, id) => {
                    return (
                      <div className="w-full mt-3">
                        <Image
                          width={1000}
                          height={1000}
                          className="w-full object-fill h-[300px] sm:h-[350px] md:h-[400px] lg:h-[650px] xl:h-[700px]"
                          key={`id: ${id}`}
                          alt="Image"
                          src={e.imgUrl}
                        />
                      </div>
                    );
                  })}
              </>
            )}
          </div>
        )}
        {activeTab === "Doctors" && (
          <div className="container mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {data?.genericServiceDoctors?.map((e, index) => {
                return (
                  <DoctorCard
                    id={e?.doctorUserId}
                    lat={data?.latitude}
                    lon={data?.longitude}
                    key={`doctor_${index}`}
                    doctor={e}
                  />
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "Services" && (
          <div>
            {data?.genericServiceDetails.map((service) => {
              return (
                <div
                  key={service?.id}
                  className="relative bg-purple-100 p-4 rounded-lg shadow-md mb-3"
                >
                  <h3 className="text-lg font-bold">{service?.title}</h3>
                  <p className="text-gray-600">{service?.details}</p>
                  <div className="flex mt-2">
                    {service?.imgList?.map((img, index) => (
                      <div key={index} className="mt-3 w-full">
                        <Image
                          width={1000}
                          height={1000}
                          src={img.imgUrl}
                          alt="Service"
                          className="w-full object-fill h-[200px] sm:h-[250px] md:h-[300px] lg:h-[550px] xl:h-[600px]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {activeTab === "Review" && (
          <ReviewList
            reviews={data?.genericServiceReview}
            averageRating={data?.averageRating}
            totalRatings={data?.totalRating}
          ></ReviewList>
        )}
      </div>
    </>
  );
}

export default DentalTabs;
