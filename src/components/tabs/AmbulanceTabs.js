"use client";
import React, { useState } from "react";
import { image_base_endpoint } from "../../utils/constants";
import ReviewList from "../ReviewList";
import Image from "next/image";

function AmbulanceTabs({ data }) {
  const [activeTab, setActiveTab] = useState("Info");
  return (
    <>
      <div className="bg-white">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex justify-start space-x-4 border-b w-full">
            {["Info", "Facilities", "Others", "Review"].map((tab) => (
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
      <div className=" mb-[70px] mt-6">
        {activeTab === "Info" && (
          <div>
            {data?.ambulanceAbout !== null && (
              <>
                <h3 className="font-bold text-lg text-black-600">
                  Ambulance Name:{data?.ambulanceAbout.name}
                </h3>
                <h3>Number: {data?.ambulanceAbout.number}</h3>
                <p>Type: {data?.ambulanceAbout.type}</p>
                <p>
                  AC available:{" "}
                  {data?.ambulanceAbout.isAC == true ? "Yes" : "No"}
                </p>
              </>
            )}
            <br></br>
            {data?.ambulanceDriverInfo !== null && (
              <>
                {" "}
                <h3 className="font-bold text-lg text-black-600">
                  Driver:{data?.ambulanceDriverInfo.name}
                </h3>
                <p>Mobile Number: {data?.ambulanceDriverInfo.mobileNo}</p>
                {data?.ambulanceDriverInfo.imageUrl !== null &&
                  data?.ambulanceDriverInfo.imageUrl !== "" && (
                    <div className="w-full mt-3">
                      <Image
                        width={1000}
                        height={1000}
                        alt="Image"
                        className="w-full object-fill h-[300px] sm:h-[350px] md:h-[400px] lg:h-[650px] xl:h-[700px]"
                        src={
                          image_base_endpoint +
                          data?.ambulanceDriverInfo.imageUrl
                        }
                      />
                    </div>
                  )}{" "}
              </>
            )}
          </div>
        )}
        {activeTab === "Facilities" && (
          <div>
            {data?.ambulanceFacility !== null && (
              <>
                <h3 className="font-bold text-lg text-black-600">
                  {data?.ambulanceFacility.title}
                </h3>
                <pre className="w-full overflow-x-auto whitespace-pre-wrap">
                  {data?.ambulanceFacility.details}
                </pre>
                {data?.ambulanceFacility.imageUrl}
                {data?.ambulanceFacility.imageUrl !== null &&
                  data?.ambulanceFacility.imageUrl !== "" && (
                    <div className="w-full mt-3">
                      <Image
                        width={1000}
                        height={1000}
                        alt="Image"
                        className="w-full object-fill h-[300px] sm:h-[350px] md:h-[400px] lg:h-[650px] xl:h-[700px]"
                        src={
                          image_base_endpoint + data?.ambulanceFacility.imageUrl
                        }
                      />
                    </div>
                  )}
              </>
            )}
          </div>
        )}

        {activeTab === "Others" && (
          <div>
            {data?.ambulanceOtherFacility !== null && (
              <>
                <h3 className="font-bold text-lg text-black-600">
                  {data?.ambulanceOtherFacility.title}
                </h3>
                <pre className="w-full overflow-x-auto whitespace-pre-wrap">
                  {data?.ambulanceOtherFacility.details}
                </pre>
              </>
            )}
          </div>
        )}
        {activeTab === "Review" && (
          <ReviewList
            reviews={data?.ambulanceReview}
            averageRating={data?.averageRating}
            totalRatings={data?.totalRating}
          />
        )}
      </div>
    </>
  );
}

export default AmbulanceTabs;
