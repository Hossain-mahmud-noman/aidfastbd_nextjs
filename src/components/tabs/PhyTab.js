"use client";
import React, { useEffect, useState } from "react";
import ReviewList from "../ReviewList";
import PhysiotherapistCard from "../PhysiotherapistCard";
import ShowOriginalImage from "../list/ShowOriginalImage";
import { useI18n } from "../../context/i18n";
import PostReview from "../postReview/PostReview";
import { useAuth } from "../../context/AuthContext";
function PhyTab({ data, typeId, url }) {
  console.log("🚀 ~ PhyTab ~ data:", data)
  const i18n = useI18n();
  const { user } = useAuth();
  const [reviewData, setReviewdData] = useState(data);
  const tabData = [
    i18n.t("Information"),
    i18n.t("Physiotherapist"),
    i18n.t("Services"),
    i18n.t("Review"),
  ];

  const fetchServiceData = async () => {
    const res = await fetch(url, { cache: "no-store" });
    const json = await res.json();
    const data = json?.data?.[0];
    setReviewdData(data);
  };
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
            style={{ "mininline-size": "100%" }}
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
                style={{ flex: "1 1 auto" }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Conditionally Render Tab Content */}
      <div className="mt-5">
        {activeTab === i18n.t("Information") && (
          <div>
            {data?.genericServiceInfos !== null &&
            data?.genericServiceInfos?.length > 0 ? (
              <>
                <h3 className="font-bold text-lg text-black-600">
                  {data?.genericServiceInfos?.[0]?.title}
                </h3>
                <pre className="w-full overflow-x-auto whitespace-pre-wrap">
                  {data?.genericServiceInfos?.[0]?.details}
                </pre>
                {data?.genericServiceInfos?.[0]?.imgList?.length > 0 &&
                  data?.genericServiceInfos?.[0]?.imgList.map((e, id) => (
                    <div key={id} className="w-full mt-3">
                      <ShowOriginalImage image={e.imgUrl} />
                    </div>
                  ))}
              </>
            ) : (
              <div
                className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4"
                role="alert"
              >
                <p className="text-yellow-700">
                  {i18n.t("No information data available")}
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === i18n.t("Physiotherapist") && (
          <div className="container mx-auto">
            {data?.genericServiceAdditionalProfiles?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {data?.genericServiceAdditionalProfiles.map((e, index) => (
                  <PhysiotherapistCard
                    id={e?.doctorUserId}
                    lat={data?.latitude}
                    lon={data?.longitude}
                    key={index}
                    doctor={e}
                  />
                ))}
              </div>
            ) : (
              <div
                className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4"
                role="alert"
              >
                <p className="text-yellow-700">
                  {i18n.t("No Physiotherapist data available")}
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === i18n.t("Services") && (
          <div>
            {data?.genericServiceDetails?.length > 0 ? (
              data.genericServiceDetails.map((service) => (
                <div
                  key={service?.id}
                  className="relative bg-purple-100 p-4 rounded-lg shadow-md mb-3"
                >
                  <h3 className="text-lg font-bold">{service?.title}</h3>
                  <p className="text-gray-600">{service?.details}</p>
                  <div className="mt-2">
                    {service?.imgList?.map((img, index) => (
                      <div key={index} className="mt-3 w-full">
                        <ShowOriginalImage image={img.imgUrl} />
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div
                className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4"
                role="alert"
              >
                <p className="text-yellow-700">
                  {i18n.t("No services data available")}
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === i18n.t("Review") && (
          <>
            {user && (
              <PostReview
                profileUserId={reviewData?.userId}
                typeId={typeId}
                onSuccess={fetchServiceData}
              />
            )}
            {reviewData?.genericServiceReview?.length > 0 ? (
              <ReviewList
                reviews={reviewData?.genericServiceReview}
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
            )}
          </>
        )}
      </div>
    </>
  );
}

export default PhyTab;
