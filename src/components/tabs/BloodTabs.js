"use client";
import React, { useEffect, useState } from "react";
import { base_endpoint, image_base_endpoint } from "../../utils/constants";
import ReviewList from "../ReviewList";
import { FaPhone, FaUserCircle, FaTint } from "react-icons/fa";
import ShowOriginalImage from "../list/ShowOriginalImage";
import { useI18n } from "../../context/i18n";
import PostReview from "../postReview/PostReview";
function BloodTabs({ data, UserId }) {
  const i18n = useI18n()
  const [reviewData, setReviewdData] = useState(data)
  const tabData = [
    i18n.t("Information"),
    i18n.t("Services"),
    i18n.t("Donor List"),
    i18n.t("Review"),
  ];

  const [activeTab, setActiveTab] = useState();

  useEffect(() => {
    setActiveTab(tabData[0]);
  }, [i18n]);

  const fetchBlooddata = async () => {
    const res = await fetch(
      `${base_endpoint}/GeneralWeb/GetAllBloodBankList?userId=${UserId}`,
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


      <div className="mt-6">

        {activeTab === i18n.t("Information") && (
          <div>
            {data?.bloodBankAdditionalInfo ? (
              <>
                <h3 className="font-bold text-lg text-black-600">
                  {data.bloodBankAdditionalInfo.title}
                </h3>
                <pre className="w-full overflow-x-auto whitespace-pre-wrap">
                  {data.bloodBankAdditionalInfo.details}
                </pre>
                {data.bloodBankAdditionalInfo.imageUrl && (
                  <div className="w-full mt-3">
                    <ShowOriginalImage image={image_base_endpoint + data.bloodBankAdditionalInfo.imageUrl} />
                  </div>
                )}
              </>
            ) : (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4" role="alert">
                <p className="text-yellow-700">{i18n.t("No information data available")}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === i18n.t("Services") && (
          <div>
            {data?.bloodBankServices && data.bloodBankServices.length > 0 ? (
              <table className="w-full border-collapse table-auto" role="table" aria-label="Services Table">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="p-4 text-left border rounded-tl-lg">#</th>
                    <th className="p-4 text-left border">{i18n.t("Service Name")}</th>
                    <th className="p-4 text-left border rounded-tr-lg">{i18n.t("Quantity")}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.bloodBankServices.map((service, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 border">{index + 1}</td>
                      <td className="p-4 border">{service.serviceName}</td>
                      <td className="p-4 border">{service.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4" role="alert">
                <p className="text-yellow-700">{i18n.t("No services data available")}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === i18n.t("Donor List") && (
          <div className="space-y-4">
            {data?.bloodBankDonerInfo && data.bloodBankDonerInfo.length > 0 ? (
              data.bloodBankDonerInfo.map((donor) => (
                <div
                  key={donor.id}
                  className="bg-white rounded-lg shadow-md p-4 "
                  role="article"
                  aria-label={`Donor ${donor.name} with blood group ${donor.bloodGroup}`}
                  tabIndex="0"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <FaUserCircle className="w-10 h-10 text-gray-600" />
                      <div>
                        <h2 className="font-semibold text-gray-800">{donor.name}</h2>
                        <div className="flex items-center mt-1">
                          <FaPhone className="w-4 h-4 text-gray-500 mr-1" />
                          <p className="text-sm text-gray-600">{donor.mobileNo}</p>
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
              ))
            ) : (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4" role="alert">
                <p className="text-yellow-700">{i18n.t("No donor data available")}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === i18n.t("Review") && (

          <>
            <PostReview
              profileUserId={reviewData?.userId}
              typeId="3"
              onSuccess={fetchBlooddata}
            />
            {
              reviewData?.bloodBankReview?.length > 0 ? (
                <ReviewList
                  reviews={reviewData?.bloodBankReview}
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

export default BloodTabs;
