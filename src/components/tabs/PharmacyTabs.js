"use client";
import React, { useEffect, useState } from "react";
import { image_base_endpoint } from "../../utils/constants";
import ReviewList from "../ReviewList";
import ShowOriginalImage from "../list/ShowOriginalImage";
import { useI18n } from "../../context/i18n";

function PharmacyTabs({ data }) {
  const i18n = useI18n()

  const tabData = [
    i18n.t("Information"),
    i18n.t("Services"),
    i18n.t("Drug List"),
    i18n.t("Equipments"),
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
            className="inline-flex md:grid md:grid-cols-5 md:w-full md:space-x-0 space-x-3"
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
      <div className="mt-6 ">

        {activeTab === i18n.t("Information") && (
          <div>
            {data?.pharmacyAdditionalInfo ? (
              <>
                <h3 className="font-bold text-lg text-black-600">
                  {data?.pharmacyAdditionalInfo?.title}
                </h3>
                <pre className="w-full overflow-x-auto whitespace-pre-wrap break-words">
                  {data?.pharmacyAdditionalInfo.details}
                </pre>
                {data?.pharmacyAdditionalInfo.imageUrl && (
                  <div className="w-full mt-3">
                    <ShowOriginalImage image={image_base_endpoint + data?.pharmacyAdditionalInfo?.imageUrl} />
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
            {data?.pharmacyOtherInfo ? (
              <>
                <h3 className="font-bold text-lg text-black-600">
                  {data?.pharmacyAdditionalInfo?.title}
                </h3>
                <pre className="w-full overflow-x-auto whitespace-pre-wrap break-words">
                  {data?.pharmacyOtherInfo.details}
                </pre>
              </>
            ) : (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4" role="alert">
                <p className="text-yellow-700">{i18n.t("No services data available")}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === i18n.t("Drug List") && (
          <div>
            {data?.pharmacyDrugEquipment?.filter(item => item.type === "Drug").length > 0 ? (
              <table className="min-w-full bg-white border border-gray-200 text-sm">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b text-left">{i18n.t("Name")}</th>
                    <th className="py-2 px-4 border-b text-left">{i18n.t("Pack Size")}</th>
                    <th className="py-2 px-4 border-b text-left">{i18n.t("Unit Price")}</th>
                    <th className="py-2 px-4 border-b text-left">{i18n.t("Total Taka")}</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.pharmacyDrugEquipment
                    .filter(item => item.type === "Drug")
                    .map(item => (
                      <tr key={item.id}>
                        <td className="py-2 px-4 border-b break-words">{item.name}</td>
                        <td className="py-2 px-4 border-b">{item.packSize}</td>
                        <td className="py-2 px-4 border-b">{item.unitPrice}</td>
                        <td className="py-2 px-4 border-b">{item.totalTaka}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4" role="alert">
                <p className="text-yellow-700">{i18n.t("No drug data available")}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === i18n.t("Equipments") && (
          <div>
            {data?.pharmacyDrugEquipment?.filter(item => item.type === "Equipments").length > 0 ? (
              <table className="min-w-full bg-white border border-gray-200 text-sm">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b text-left">{i18n.t("Name")}</th>
                    <th className="py-2 px-4 border-b text-left">{i18n.t("Pack Size")}</th>
                    <th className="py-2 px-4 border-b text-left">{i18n.t("Unit Price")}</th>
                    <th className="py-2 px-4 border-b text-left">{i18n.t("Total Taka")}</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.pharmacyDrugEquipment
                    .filter(item => item.type === "Equipments")
                    .map(item => (
                      <tr key={item.id}>
                        <td className="py-2 px-4 border-b break-words">{item.name}</td>
                        <td className="py-2 px-4 border-b">{item.packSize}</td>
                        <td className="py-2 px-4 border-b">{item.unitPrice}</td>
                        <td className="py-2 px-4 border-b">{item.totalTaka}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4" role="alert">
                <p className="text-yellow-700">{i18n.t("No equipment data available")}</p>
              </div>
            )}
          </div>
        )}


        {activeTab === i18n.t("Review") && (


          data?.pharmacyReview?.length > 0 ? (
            <ReviewList
              reviews={data?.pharmacyReview}
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

export default PharmacyTabs;
