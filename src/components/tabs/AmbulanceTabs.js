"use client";
import React, { useEffect, useState } from "react";
import { image_base_endpoint } from "../../utils/constants";
import ReviewList from "../ReviewList";
import ShowOriginalImage from "../list/ShowOriginalImage";
import { useI18n } from "../../context/i18n";

function AmbulanceTabs({ data }) {
  const i18n = useI18n()

  const tabData = [
    i18n.t("Information"),
    i18n.t("Facilities"),
    i18n.t("Others"),
    i18n.t("Review"),
  ];

  const [activeTab, setActiveTab] = useState();

  useEffect(() => {
    setActiveTab(tabData[0]);
  }, [i18n]);
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
      <div className=" mb-[70px] mt-6">
        {/* === Information Tab === */}
        {activeTab === i18n.t("Information") && (
          <div>
            {data?.ambulanceAbout ? (
              <>
                <h3 className="font-bold text-lg text-black-600">
                  {i18n.t("Ambulance Name")}: {data.ambulanceAbout.name}
                </h3>
                <p>{i18n.t("Licence Number")}: {data.ambulanceAbout.number}</p>
                <p>{i18n.t("Ambulence Type")}: {data.ambulanceAbout.type}</p>
                <p>{i18n.t("AC Available")}: {data.ambulanceAbout.isAC ? "Yes" : "No"}</p>
              </>
            ) : (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4" role="alert">
                <p className="text-yellow-700">{i18n.t("No ambulance info available")}</p>
              </div>
            )}

            <br />

            {data?.ambulanceDriverInfo ? (
              <>
                <h3 className="font-bold text-lg text-black-600">
                  {i18n.t("Driver Name")}: {data.ambulanceDriverInfo.name}
                </h3>
                <p>{i18n.t("Mobile Number")}: {data.ambulanceDriverInfo.mobileNo}</p>
                {data.ambulanceDriverInfo.imageUrl && (
                  <div className="w-full mt-3">
                    <ShowOriginalImage
                      image={image_base_endpoint + data.ambulanceDriverInfo.imageUrl}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4" role="alert">
                <p className="text-yellow-700">{i18n.t("No driver info available")}</p>
              </div>
            )}
          </div>
        )}

        {/* === Facilities Tab === */}
        {activeTab === i18n.t("Facilities") && (
          <div>
            {data?.ambulanceFacility ? (
              <>
                <h3 className="font-bold text-lg text-black-600">
                  {data.ambulanceFacility.title}
                </h3>
                <pre className="w-full overflow-x-auto whitespace-pre-wrap">
                  {data.ambulanceFacility.details}
                </pre>
                {data.ambulanceFacility.imageUrl && (
                  <div className="w-full mt-3">
                    <ShowOriginalImage
                      image={image_base_endpoint + data.ambulanceFacility.imageUrl}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4" role="alert">
                <p className="text-yellow-700">{i18n.t("No facility data available")}</p>
              </div>
            )}
          </div>
        )}

        {/* === Others Tab === */}
        {activeTab === i18n.t("Others") && (
          <div>
            {data?.ambulanceOtherFacility ? (
              <>
                <h3 className="font-bold text-lg text-black-600">
                  {data.ambulanceOtherFacility.title}
                </h3>
                <pre className="w-full overflow-x-auto whitespace-pre-wrap">
                  {data.ambulanceOtherFacility.details}
                </pre>
              </>
            ) : (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4" role="alert">
                <p className="text-yellow-700">{i18n.t("No other facility data available")}</p>
              </div>
            )}
          </div>
        )}


        {activeTab === i18n.t("Review") && (

          data?.ambulanceReview?.length > 0 ? (
            <ReviewList
              reviews={data?.ambulanceReview}
              averageRating={data?.averageRating}
              totalRatings={data?.totalRating}
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
        )}
      </div>
    </>
  );
}

export default AmbulanceTabs;
