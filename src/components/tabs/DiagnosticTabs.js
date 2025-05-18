"use client";

import React, { useState } from "react";
import { image_base_endpoint } from "../../utils/constants";
import DoctorCard from "../DoctorCard";
import ReviewList from "../ReviewList";
import Image from "next/image";
import ShowOriginalImage from "../list/ShowOriginalImage";

function DiagnosticTabs({ data }) {
  const [activeTab, setActiveTab] = useState("Info");
  return (
    <>
      <div className="bg-white">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex justify-start space-x-4 pl-4 pr-4 border-b w-full">
            {["Info", "Doctor", "Services", "Review"].map((tab) => (
              <button
                key={tab}
                className={`text-sm font-semibold whitespace-nowrap p-3 ${activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
                  }`}
                onClick={() => {
                  setActiveTab(tab);
                }}
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
            <h3 className="font-bold text-lg text-black-600">
              {data?.diagnosticCenterAdditionalInfo?.title}
            </h3>
            <pre className="w-full overflow-x-auto whitespace-pre-wrap">
              {data?.diagnosticCenterAdditionalInfo?.details}
            </pre>
            {data?.diagnosticCenterAdditionalInfo?.imageUrl !== null &&
              data?.diagnosticCenterAdditionalInfo?.imageUrl !== "" && (
                <div className="w-full mt-3">
                  {/* <Image
                    width={1000}
                    height={1000}
                    alt="Image"
                    className="w-full object-fill h-[300px] sm:h-[350px] md:h-[400px] lg:h-[650px] xl:h-[700px]"  
                    src={
                      image_base_endpoint +
                      data?.diagnosticCenterAdditionalInfo?.imageUrl
                    }
                  /> */}
                  <ShowOriginalImage image={image_base_endpoint + data?.diagnosticCenterAdditionalInfo?.imageUrl} />
                </div>
              )}
            {data?.diagnosticCenterAdditionalInfo?.imgList !== null &&
              data?.diagnosticCenterAdditionalInfo?.imgList.map((e, index) => {
                return (
                  <div className="w-full mt-3">
                    {/* <Image
                      width={1000}
                      height={1000}
                      alt="Image"
                      key={`imgList_${index}`}
                      className="w-full object-fill h-[300px] sm:h-[350px] md:h-[400px] lg:h-[650px] xl:h-[700px]"
                      src={e?.imgUrl}
                    /> */}
                    <ShowOriginalImage image={e?.imgUrl} />
                  </div>
                );
              })}
          </div>
        )}
        {activeTab === "Doctor" && (
          <div className="container mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {data?.diagnosticCenterDoctors.map((e, index) => {
                return (
                  <DoctorCard
                    id={e?.doctorUserId}
                    lat={data?.latitude}
                    lon={data?.longitude}
                    key={`doctor_${index}`}
                    doctor={e}
                  ></DoctorCard>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "Services" && (
          <div className="w-full overflow-x-auto">
            {data?.diagnosticCenterServices.length > 0 ? (
              <>
                <div>
                  {data?.diagnosticCenterServices
                    ?.filter((service) => service.serviceType === "heading")
                    .map((service) => {
                      return (
                        <div
                          key={service.id}
                          className="relative bg-purple-100 p-4 rounded-lg shadow-md mb-3"
                        >
                          <h3 className="text-lg font-bold">
                            {service.serviceName}
                          </h3>
                          <p className="text-gray-600">{service.price}</p>
                          <div className="mt-2">
                            {service.remarks
                              .split(",")
                              .map((i) => i.trim())
                              .map((img, index) => (
                                <div key={index} className="w-full mt-3">
                                  {/* <Image
                                    width={1000}
                                    height={1000}
                                    alt="Image"
                                    key={`imgList_${index}`}
                                    className="w-full object-fill h-[300px] sm:h-[350px] md:h-[400px] lg:h-[650px] xl:h-[700px]"
                                    src={img}
                                  /> */}
                                  <ShowOriginalImage image={img} />
                                </div>
                              ))}
                          </div>
                        </div>
                      );
                    })}
                </div>
                <h3 className="text-lg font-semibold mb-4">Investigation</h3>
                <table
                  className="w-full border-collapse table-auto"
                  role="table"
                  aria-label="Services Table"
                >
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-200">
                      <th
                        className="p-4 text-left border rounded-tl-lg"
                        role="columnheader"
                      >
                        #
                      </th>
                      <th className="p-4 text-left border" role="columnheader">
                        Name
                      </th>

                      <th
                        className="p-4 text-left border rounded-tr-lg"
                        role="columnheader"
                      >
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.diagnosticCenterServices
                      .filter((i) => i.serviceType === "Investigation")
                      .map((service, index) => (
                        <tr
                          key={index + 1}
                          className="hover:bg-gray-50 focus-within:bg-gray-50 transition-colors"
                          role="row"
                        >
                          <td className="p-4 border" role="cell">
                            {index + 1}
                          </td>
                          <td className="p-4 border" role="cell">
                            {service.serviceName}
                          </td>
                          <td className="p-4 border" role="cell">
                            {service.price}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>

                <h3 className="text-lg font-semibold mt-4 mb-4">OT List</h3>
                <div className="w-full overflow-x-auto">
                  <table
                    className="w-full border-collapse table-fixed"
                    role="table"
                    aria-label="Operating Theater (OT) Services List"
                  >
                    <thead>
                      <tr className="bg-gray-100 border-b border-gray-200">
                        <th
                          className="p-4 text-left border rounded-tl-lg"
                          role="columnheader"
                          style={{ inlineSize: "40px" }}
                        >
                          #
                        </th>
                        <th
                          className="p-4 text-left border"
                          role="columnheader"
                        >
                          Name
                        </th>
                        <th
                          className="p-4 text-left border"
                          role="columnheader"
                        >
                          Price
                        </th>
                        <th
                          className="p-4 text-left border rounded-tr-lg"
                          role="columnheader"
                        >
                          Remarks
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.diagnosticCenterServices
                        .filter((i) => i.serviceType === "OT List")
                        .map((service, index) => (
                          <tr
                            key={index + 1}
                            className="hover:bg-gray-50 focus-within:bg-gray-50 transition-colors"
                            role="row"
                          >
                            <td
                              className="p-4 border text-center"
                              style={{ inlineSize: "40px" }}
                              role="cell"
                            >
                              {index + 1}
                            </td>
                            <td className="p-4 border break-words" role="cell">
                              {service.serviceName}
                            </td>
                            <td className="p-4 border break-words" role="cell">
                              {service.price}
                            </td>
                            <td
                              className="p-4 border break-words truncate"
                              role="cell"
                            >
                              {service.remarks}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div
                className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4"
                role="alert"
              >
                <p className="text-yellow-700">No Services data available.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "Review" && (
          <ReviewList
            reviews={data?.diagnosticCenterReview}
            averageRating={data?.averageRating}
            totalRatings={data?.totalRating}
          />
        )}
      </div>
    </>
  );
}

export default DiagnosticTabs;
