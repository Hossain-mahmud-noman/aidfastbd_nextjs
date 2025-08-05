"use client";

import React, { useEffect, useState } from "react";
import { base_endpoint, image_base_endpoint } from "../../utils/constants";
import DiagnostickDoctorCard from "../DiagnostickDoctorCard";
import ReviewList from "../ReviewList";
import ShowOriginalImage from "../list/ShowOriginalImage";
import { useI18n } from "../../context/i18n";
import PostReview from "../postReview/PostReview";
import { useAuth } from "../../context/AuthContext";
import { Button } from "antd";

function DiagnosticTabs({ data, userId }) {
  console.log("🚀 ~ DiagnosticTabs ~ data:", data)
  const { user } = useAuth()
  const i18n = useI18n()
  const [reviewData, setReviewdData] = useState(data)

  const tabData = [
    i18n.t("Information"),
    i18n.t("Doctor"),
    i18n.t("Services"),
    i18n.t("Review"),
  ];

  const [activeTab, setActiveTab] = useState();

  const fetchAccess = async (doctorId, diagnosticCenterId) => {
    const token = localStorage.getItem("token"); // or your specific key

    const res = await fetch(
      `https://api.aidfastbd.com/api/Doctor/GetChamberInformationByDiagnosticAndDoctorId?genericServiceId=${diagnosticCenterId}&doctorId=${doctorId}`,
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        cache: "no-store"
      }
    );

    const json = await res.json();
    const Accessdata = json?.data?.[0];
  };



  useEffect(() => {
    setActiveTab(tabData[0]);
  }, [i18n]);

  const fetchDiagnosticData = async () => {
    const res = await fetch(
      `${base_endpoint}/GeneralWeb/GetAllDiagnosticCenterList?userId=${userId}`,
      { cache: "no-store" }
    );
    const json = await res.json();
    const data = json?.data?.[0];
    setReviewdData(data)
  }
  return (
    <>
      <div className="bg-white shadow-custom-light aid-container my-4 md:my-5 lg:my-8">
        <div className="overflow-x-auto md:overflow-x-visible">
          <div
            className="inline-flex md:grid md:grid-cols-4 md:w-full md:space-x-0 space-x-3"
            style={{ "mininline-size": '100%' }}
          >
            {tabData.map((tab) => (
              <button
                key={tab}
                className={`
            text-sm font-semibold whitespace-nowrap border-2 border-primary py-2 px-4 rounded-md md:rounded-none
            ${activeTab === tab ? "text-white bg-primary" : "text-gray-500"}
            md:flex md:justify-center
          `}
                onClick={() => setActiveTab(tab)}
                style={{ flex: '1 1 auto' }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Conditionally Render Tab Content */}
      <div className="mt-6">
        {activeTab === i18n.t("Information") && (
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

        {activeTab === i18n.t("Doctor") && (
          <div className="container mx-auto">
            {data?.diagnosticCenterDoctors?.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6">
                {data.diagnosticCenterDoctors.map((e, index) => (
                  <div key={`doctor_${index}`}>
                    <DiagnostickDoctorCard
                      doctor={e}
                    />
                    {/* <Button
                      onClick={() => fetchAccess(e?.doctorUserId, e?.diagnosticCenterId)}
                      type="primary"
                    >
                      Edit
                    </Button> */}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-10">
                No Diagnostic Doctor Found
              </p>
            )}
          </div>
        )}


        {activeTab === i18n.t("Services") && (
          <div className="w-full overflow-x-auto">
            {data?.diagnosticCenterServices.length > 0 ? (


              <>
                {/* Heading Section */}
                <div>
                  {data?.diagnosticCenterServices
                    ?.filter((service) => service.serviceType === "heading")
                    .map((service) => (
                      <div
                        key={service.id}
                        className="relative bg-purple-100 p-4 rounded-lg shadow-md mb-3"
                      >
                        <h3 className="text-lg font-bold">{service.serviceName}</h3>
                        <p className="text-gray-600">{service.price}</p>
                        <div className="mt-2">
                          {service.remarks &&
                            service.remarks
                              .split(",")
                              .map((i) => i.trim())
                              .map((img, index) => (
                                <div key={index} className="w-full mt-3">
                                  <ShowOriginalImage image={img} />
                                </div>
                              ))}
                        </div>
                      </div>
                    ))}
                </div>

                {/* Investigation Table */}
                {data?.diagnosticCenterServices?.some(
                  (i) => i.serviceType === "Investigation"
                ) && (
                    <>
                      <h3 className="text-lg font-semibold mb-4 mt-6">{i18n.t("Investigation")}</h3>
                      <table className="w-full border-collapse table-auto">
                        <thead>
                          <tr className="bg-gray-100 border-b border-gray-200">
                            <th className="p-4 text-left border rounded-tl-lg">#</th>
                            <th className="p-4 text-left border">{i18n.t("Name")}</th>
                            <th className="p-4 text-left border rounded-tr-lg">{i18n.t("Price")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.diagnosticCenterServices
                            .filter((i) => i.serviceType === "Investigation")
                            .map((service, index) => (
                              <tr key={service.id} className="hover:bg-gray-50">
                                <td className="p-4 border">{index + 1}</td>
                                <td className="p-4 border">{service.serviceName}</td>
                                <td className="p-4 border">{service.price}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </>
                  )}

                {/* OT List Table */}
                {data?.diagnosticCenterServices?.some((i) => i.serviceType === "OT List") && (
                  <>
                    <h3 className="text-lg font-semibold mt-6 mb-4">{i18n.t("OT List")}</h3>
                    <table className="w-full border-collapse table-auto">
                      <thead>
                        <tr className="bg-gray-100 border-b border-gray-200">
                          <th className="p-4 text-left border rounded-tl-lg">#</th>
                          <th className="p-4 text-left border">{i18n.t("Name")}</th>
                          <th className="p-4 text-left border">{i18n.t("Price")}</th>
                          <th className="p-4 text-left border rounded-tr-lg">{i18n.t("Remarks")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.diagnosticCenterServices
                          .filter((i) => i.serviceType === "OT List")
                          .map((service, index) => (
                            <tr key={service.id} className="hover:bg-gray-50">
                              <td className="p-4 border">{index + 1}</td>
                              <td className="p-4 border">{service.serviceName}</td>
                              <td className="p-4 border">{service.price}</td>
                              <td className="p-4 border">
                                {service.remarks || "—"}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </>
                )}

                {/* BED Category Table */}
                {data?.diagnosticCenterServices?.some(
                  (i) => i.serviceType === "BED Category"
                ) && (
                    <>
                      <h3 className="text-lg font-semibold mt-6 mb-4">{i18n.t("Bed Category")}</h3>
                      <table className="w-full border-collapse table-auto">
                        <thead>
                          <tr className="bg-gray-100 border-b border-gray-200">
                            <th className="p-4 text-left border rounded-tl-lg">#</th>
                            <th className="p-4 text-left border">{i18n.t("Name")}</th>
                            <th className="p-4 text-left border rounded-tr-lg">{i18n.t("Price")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.diagnosticCenterServices
                            .filter((i) => i.serviceType === "BED Category")
                            .map((service, index) => (
                              <tr key={service.id} className="hover:bg-gray-50">
                                <td className="p-4 border">{index + 1}</td>
                                <td className="p-4 border">{service.serviceName}</td>
                                <td className="p-4 border">{service.price}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </>
                  )}

                {/* Health Package Table */}
                {data?.diagnosticCenterServices?.some(
                  (i) => i.serviceType === "Health Package"
                ) && (
                    <>
                      <h3 className="text-lg font-semibold mt-6 mb-4">{i18n.t("Health Packages")}</h3>
                      <table className="w-full border-collapse table-auto">
                        <thead>
                          <tr className="bg-gray-100 border-b border-gray-200">
                            <th className="p-4 text-left border rounded-tl-lg">#</th>
                            <th className="p-4 text-left border">{i18n.t("Package Name")}</th>
                            <th className="p-4 text-left border rounded-tr-lg">{i18n.t("Price")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.diagnosticCenterServices
                            .filter((i) => i.serviceType === "Health Package")
                            .map((service, index) => (
                              <tr key={service.id} className="hover:bg-gray-50">
                                <td className="p-4 border">{index + 1}</td>
                                <td className="p-4 border">{service.serviceName}</td>
                                <td className="p-4 border">{service.price}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </>
                  )}
              </>


            ) : (
              <div
                className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4"
                role="alert"
              >
                <p className="text-yellow-700">{i18n.t("No Services data available")}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === i18n.t("Review") && (

          <>
            {
              user && (
                <PostReview
                  profileUserId={reviewData?.userId}
                  typeId="2"
                  onSuccess={fetchDiagnosticData}
                />
              )
            }
            {
              reviewData?.diagnosticCenterReview?.length > 0 ? (
                <ReviewList
                  reviews={reviewData?.diagnosticCenterReview}
                  averageRating={reviewData?.averageRating}
                  totalRatings={reviewData?.totalRating}
                />
              ) : (
                <div
                  className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4"
                  role="alert"
                >
                  <p className="text-yellow-700">
                    {i18n.t("No review data available")}
                  </p>
                </div>
              )
            }
          </>

        )}
      </div>
    </>
  );
}

export default DiagnosticTabs;
