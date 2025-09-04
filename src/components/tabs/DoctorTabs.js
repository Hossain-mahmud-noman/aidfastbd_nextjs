"use client";
import React, { useEffect, useState } from "react";
import { base_endpoint, image_base_endpoint } from "../../utils/constants";
import TextTicker from "../TextTicker";
import ReviewList from "../ReviewList";
import { FaPhoneAlt } from "react-icons/fa";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import Image from "next/image";
import ShowOriginalImage from "../list/ShowOriginalImage";
import { useI18n } from "../../context/i18n";
import ContacTactModal from "../../utils/contactModal";
import PostReview from "../postReview/PostReview";
import { useAuth } from "../../context/AuthContext";
import { useSearchParams } from "next/navigation";

function DoctorTabs({ data, UserId }) {
  console.log("🚀 ~ DoctorTabs ~ data:", data)
  const i18n = useI18n()
  const { user } = useAuth()
  const [reviewData, setReviewdData] = useState(data)
  const [showModal, setShowModal] = useState(false);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const params = useSearchParams()
  let diagnosticCenter = params.get("diagnosticCenterid")
  console.log("🚀 ~ DoctorTabs ~ diagnosticCenterid:", diagnosticCenter)

  const tabData = [
    i18n.t("Information"),
    i18n.t("Chamber"),
    i18n.t("Experience"),
    i18n.t("Review"),
  ];

  const [activeTab, setActiveTab] = useState();

  useEffect(() => {
    setActiveTab(tabData[0]);
  }, [i18n]);



  const formatDate = (dateString) => {
    if (dateString === "Present") return dateString;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };
  const dayNameMap = {
    SUN: { en: "Sunday", bn: "রবিবার" },
    MON: { en: "Monday", bn: "সোমবার" },
    TUE: { en: "Tuesday", bn: "মঙ্গলবার" },
    WED: { en: "Wednesday", bn: "বুধবার" },
    THU: { en: "Thursday", bn: "বৃহস্পতিবার" },
    FRI: { en: "Friday", bn: "শুক্রবার" },
    SAT: { en: "Saturday", bn: "শনিবার" },
  };

  const fetchDoctorProfile = async () => {
    const res = await fetch(
      `${base_endpoint}/GeneralWeb/GetDoctorInfoList?userid=${UserId}`,
      { cache: "no-store" }
    );
    const json = await res.json();
    const data = json?.[0];
    setReviewdData(data)
  }

  return (
    <>
      <div className="bg-white shadow-custom-light  my-4 md:my-5 lg:my-8 aid-container">
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
      <div className="mt-6 aid-container">
        {activeTab === i18n.t("Information") && (
          <div>
            <h3 className="font-bold text-lg text-black-600">
              {data?.doctorAdditionalInfo?.title}
            </h3>
            <pre className="w-full overflow-x-auto whitespace-pre-wrap">
              {data?.doctorAdditionalInfo?.details}
            </pre>
            {data?.doctorAdditionalInfo?.imageUrl !== null &&
              data?.doctorAdditionalInfo?.imageUrl !== "" && (
                <>
                  {/* <Image
                    alt="Image"
                    width={200}
                    height={200}
                    src={
                      image_base_endpoint + data?.doctorAdditionalInfo?.imageUrl
                    }
                  /> */}
                  <ShowOriginalImage slug="doctor" image={image_base_endpoint + data?.doctorAdditionalInfo?.imageUrl} />
                </>
              )}


            <div className="mt-5 lg:mt-8">
              <h3 className="font-bold text-lg">{i18n.t("Chamber Information")}</h3>
              <div className="">
                {data?.chamberInformation?.map((e, index) => {
                  return (
                    diagnosticCenter === null || diagnosticCenter === "null" ?
                      <div className="border border-primary rounded-lg my-3 lg:my-6 p-3 lg:p-6" key={index}>
                        <div className="">
                          <h4 className="font-bold text-lg text-blue-700">
                            {e?.name}
                          </h4>

                          <div className="flex items-center justify-start text-left space-x-2 mt-3 lg:mt-4">
                            {e?.location && e?.lat && e?.lon && (
                              <>
                                <span className="font-bold text-sm">
                                  {i18n.t("Location")}: {e.location}
                                </span>
                                <Image
                                  onClick={() => {
                                    const mapUrl = `https://www.google.com/maps?q=${e.lat},${e.lon}`;
                                    window.open(mapUrl, "_blank");
                                  }}
                                  src="/icons/map.png"
                                  alt="Map Icon"
                                  width={30}
                                  height={30}
                                  className="cursor-pointer"
                                />
                              </>
                            )}

                          </div>

                          <div className="mt-3 lg:mt-4">
                            {e?.notice !== null && e?.notice !== "" && (
                              <TextTicker text={e?.notice} />
                            )}
                          </div>
                          <h4 className="font-bold text-sm text-green-700 mt-3 lg:mt-4">
                            {i18n.t("Visiting Hours")}
                          </h4>

                          <div className="overflow-x-auto mt-3 lg:mt-4">
                            <table
                              className="w-full text-sm"
                              aria-label="Chamber Visiting Hours"
                            >
                              <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                  <th className="py-3 px-4 text-left">{i18n.t("Day")}</th>
                                  <th className="py-3 px-4 text-left">{i18n.t("Day Time")}</th>
                                  <th className="py-3 px-4 text-left">{i18n.t("Evening Time")}</th>
                                  <th className="py-3 px-4 text-left">{i18n.t("Status")}</th>
                                </tr>
                              </thead>
                              <tbody className="text-gray-600 text-sm font-light">
                                {e?.chamberTimeDetails?.map((schedule, index) => (
                                  <tr
                                    key={`schedule_${index}`}
                                    className={`border-b border-gray-200 hover:bg-gray-100`}
                                  >
                                    <td className="py-3 px-4 text-left">
                                      {
                                        dayNameMap[schedule?.dayName]?.[i18n.language === "bn" ? "bn" : "en"] ||
                                        schedule?.dayName // fallback
                                      }
                                    </td>

                                    <td className="py-3 px-4 text-left">
                                      {schedule?.dayTime}
                                    </td>
                                    <td className="py-3 px-4 text-left">
                                      {schedule.eveningTime}
                                    </td>
                                    <td className="py-3 px-4 text-left">
                                      <span
                                        className={`${schedule.isOpen
                                          ? "bg-green-200 text-green-600"
                                          : "bg-red-200 text-red-600"
                                          } py-1 px-3 rounded-full text-xs`}
                                      >
                                        {schedule.isOpen ? i18n.t("Open") : i18n.t("Closed")}
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
                            <strong>{i18n.t("Fee")}:</strong> {e.fee} /=
                          </p>
                          <p>
                            <strong>{i18n.t("Follow-up")}:</strong> {e.oldPatient} /=
                          </p>
                          <p>
                            <strong>{i18n.t("Report Showing")}:</strong> {e.reportShow} /=
                          </p>
                          <p>
                            <strong>{i18n.t("Room No")}:</strong> {e.room}
                          </p>
                          <p>
                            <strong>{i18n.t("Floor")}:</strong> {e.floor}
                          </p>
                          <div className="mt-2 mb-2">
                            <button
                              onClick={handleOpen}
                              className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm flex items-center space-x-2 max-w-fit"
                              style={{ inlineSize: "auto" }}
                            >
                              <FaPhoneAlt />
                              <span>{i18n.t("Call Now")}</span>
                            </button>
                          </div>
                          <ContacTactModal
                            contact={e.phoneNumber}
                            open={showModal}
                            onClose={handleClose}
                          />
                        </div>
                      </div> :

                      diagnosticCenter === e?.diagnosticEditableChamberId &&
                      (
                        <div className="border border-primary rounded-lg my-3 lg:my-6 p-3 lg:p-6" key={index}>
                          <div className="">
                            <h4 className="font-bold text-lg text-blue-700">
                              {e?.name}
                            </h4>

                            <div className="flex items-center justify-start text-left space-x-2 mt-3 lg:mt-4">
                              {e?.location && e?.lat && e?.lon && (
                                <>
                                  <span className="font-bold text-sm">
                                    {i18n.t("Location")}: {e.location}
                                  </span>
                                  <Image
                                    onClick={() => {
                                      const mapUrl = `https://www.google.com/maps?q=${e.lat},${e.lon}`;
                                      window.open(mapUrl, "_blank");
                                    }}
                                    src="/icons/map.png"
                                    alt="Map Icon"
                                    width={30}
                                    height={30}
                                    className="cursor-pointer"
                                  />
                                </>
                              )}

                            </div>

                            <div className="mt-3 lg:mt-4">
                              {e?.notice !== null && e?.notice !== "" && (
                                <TextTicker text={e?.notice} />
                              )}
                            </div>
                            <h4 className="font-bold text-sm text-green-700 mt-3 lg:mt-4">
                              {i18n.t("Visiting Hours")}
                            </h4>

                            <div className="overflow-x-auto mt-3 lg:mt-4">
                              <table
                                className="w-full text-sm"
                                aria-label="Chamber Visiting Hours"
                              >
                                <thead>
                                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-4 text-left">{i18n.t("Day")}</th>
                                    <th className="py-3 px-4 text-left">{i18n.t("Day Time")}</th>
                                    <th className="py-3 px-4 text-left">{i18n.t("Evening Time")}</th>
                                    <th className="py-3 px-4 text-left">{i18n.t("Status")}</th>
                                  </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                  {e?.chamberTimeDetails?.map((schedule, index) => (
                                    <tr
                                      key={`schedule_${index}`}
                                      className={`border-b border-gray-200 hover:bg-gray-100`}
                                    >
                                      <td className="py-3 px-4 text-left">
                                        {
                                          dayNameMap[schedule?.dayName]?.[i18n.language === "bn" ? "bn" : "en"] ||
                                          schedule?.dayName // fallback
                                        }
                                      </td>

                                      <td className="py-3 px-4 text-left">
                                        {schedule?.dayTime}
                                      </td>
                                      <td className="py-3 px-4 text-left">
                                        {schedule.eveningTime}
                                      </td>
                                      <td className="py-3 px-4 text-left">
                                        <span
                                          className={`${schedule.isOpen
                                            ? "bg-green-200 text-green-600"
                                            : "bg-red-200 text-red-600"
                                            } py-1 px-3 rounded-full text-xs`}
                                        >
                                          {schedule.isOpen ? i18n.t("Open") : i18n.t("Closed")}
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
                              <strong>{i18n.t("Fee")}:</strong> {e.fee} /=
                            </p>
                            <p>
                              <strong>{i18n.t("Follow-up")}:</strong> {e.oldPatient} /=
                            </p>
                            <p>
                              <strong>{i18n.t("Report Showing")}:</strong> {e.reportShow} /=
                            </p>
                            <p>
                              <strong>{i18n.t("Room No")}:</strong> {e.room}
                            </p>
                            <p>
                              <strong>{i18n.t("Floor")}:</strong> {e.floor}
                            </p>
                            <div className="mt-2 mb-2">
                              <button
                                onClick={handleOpen}
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm flex items-center space-x-2 max-w-fit"
                                style={{ inlineSize: "auto" }}
                              >
                                <FaPhoneAlt />
                                <span>{i18n.t("Call Now")}</span>
                              </button>
                            </div>
                            <ContacTactModal
                              contact={e.phoneNumber}
                              open={showModal}
                              onClose={handleClose}
                            />
                          </div>
                        </div>
                      )
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === i18n.t("Chamber") && (
          <div>
            <h3 className="font-bold text-lg">{i18n.t("Chamber Information")}</h3>
            <div className="">
              {data?.chamberInformation?.map((e, index) => {
                return (
                  diagnosticCenter === null || diagnosticCenter === "null" ?
                    <div className="border border-primary rounded-lg my-3 lg:my-6 p-3 lg:p-6" key={index}>
                      <div className="">
                        <h4 className="font-bold text-lg text-blue-700">
                          {e?.name}
                        </h4>

                        <div className="flex items-center justify-start text-left space-x-2 mt-3 lg:mt-4">
                          {e?.location && e?.lat && e?.lon && (
                            <>
                              <span className="font-bold text-sm">
                                {i18n.t("Location")}: {e.location}
                              </span>
                              <Image
                                onClick={() => {
                                  const mapUrl = `https://www.google.com/maps?q=${e.lat},${e.lon}`;
                                  window.open(mapUrl, "_blank");
                                }}
                                src="/icons/map.png"
                                alt="Map Icon"
                                width={30}
                                height={30}
                                className="cursor-pointer"
                              />
                            </>
                          )}

                        </div>

                        <div className="mt-3 lg:mt-4">
                          {e?.notice !== null && e?.notice !== "" && (
                            <TextTicker text={e?.notice} />
                          )}
                        </div>
                        <h4 className="font-bold text-sm text-green-700 mt-3 lg:mt-4">
                          {i18n.t("Visiting Hours")}
                        </h4>

                        <div className="overflow-x-auto mt-3 lg:mt-4">
                          <table
                            className="w-full text-sm"
                            aria-label="Chamber Visiting Hours"
                          >
                            <thead>
                              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-4 text-left">{i18n.t("Day")}</th>
                                <th className="py-3 px-4 text-left">{i18n.t("Day Time")}</th>
                                <th className="py-3 px-4 text-left">{i18n.t("Evening Time")}</th>
                                <th className="py-3 px-4 text-left">{i18n.t("Status")}</th>
                              </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                              {e?.chamberTimeDetails?.map((schedule, index) => (
                                <tr
                                  key={`schedule_${index}`}
                                  className={`border-b border-gray-200 hover:bg-gray-100`}
                                >
                                  <td className="py-3 px-4 text-left">
                                    {
                                      dayNameMap[schedule?.dayName]?.[i18n.language === "bn" ? "bn" : "en"] ||
                                      schedule?.dayName // fallback
                                    }
                                  </td>

                                  <td className="py-3 px-4 text-left">
                                    {schedule?.dayTime}
                                  </td>
                                  <td className="py-3 px-4 text-left">
                                    {schedule.eveningTime}
                                  </td>
                                  <td className="py-3 px-4 text-left">
                                    <span
                                      className={`${schedule.isOpen
                                        ? "bg-green-200 text-green-600"
                                        : "bg-red-200 text-red-600"
                                        } py-1 px-3 rounded-full text-xs`}
                                    >
                                      {schedule.isOpen ? i18n.t("Open") : i18n.t("Closed")}
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
                          <strong>{i18n.t("Fee")}:</strong> {e.fee} /=
                        </p>
                        <p>
                          <strong>{i18n.t("Follow-up")}:</strong> {e.oldPatient} /=
                        </p>
                        <p>
                          <strong>{i18n.t("Report Showing")}:</strong> {e.reportShow} /=
                        </p>
                        <p>
                          <strong>{i18n.t("Room No")}:</strong> {e.room}
                        </p>
                        <p>
                          <strong>{i18n.t("Floor")}:</strong> {e.floor}
                        </p>
                        <div className="mt-2 mb-2">
                          <button
                            onClick={handleOpen}
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm flex items-center space-x-2 max-w-fit"
                            style={{ inlineSize: "auto" }}
                          >
                            <FaPhoneAlt />
                            <span>{i18n.t("Call Now")}</span>
                          </button>
                        </div>
                        <ContacTactModal
                          contact={e.phoneNumber}
                          open={showModal}
                          onClose={handleClose}
                        />
                      </div>
                    </div> :

                    diagnosticCenter === e?.diagnosticEditableChamberId &&
                    (
                      <div className="border border-primary rounded-lg my-3 lg:my-6 p-3 lg:p-6" key={index}>
                        <div className="">
                          <h4 className="font-bold text-lg text-blue-700">
                            {e?.name}
                          </h4>

                          <div className="flex items-center justify-start text-left space-x-2 mt-3 lg:mt-4">
                            {e?.location && e?.lat && e?.lon && (
                              <>
                                <span className="font-bold text-sm">
                                  {i18n.t("Location")}: {e.location}
                                </span>
                                <Image
                                  onClick={() => {
                                    const mapUrl = `https://www.google.com/maps?q=${e.lat},${e.lon}`;
                                    window.open(mapUrl, "_blank");
                                  }}
                                  src="/icons/map.png"
                                  alt="Map Icon"
                                  width={30}
                                  height={30}
                                  className="cursor-pointer"
                                />
                              </>
                            )}

                          </div>

                          <div className="mt-3 lg:mt-4">
                            {e?.notice !== null && e?.notice !== "" && (
                              <TextTicker text={e?.notice} />
                            )}
                          </div>
                          <h4 className="font-bold text-sm text-green-700 mt-3 lg:mt-4">
                            {i18n.t("Visiting Hours")}
                          </h4>

                          <div className="overflow-x-auto mt-3 lg:mt-4">
                            <table
                              className="w-full text-sm"
                              aria-label="Chamber Visiting Hours"
                            >
                              <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                  <th className="py-3 px-4 text-left">{i18n.t("Day")}</th>
                                  <th className="py-3 px-4 text-left">{i18n.t("Day Time")}</th>
                                  <th className="py-3 px-4 text-left">{i18n.t("Evening Time")}</th>
                                  <th className="py-3 px-4 text-left">{i18n.t("Status")}</th>
                                </tr>
                              </thead>
                              <tbody className="text-gray-600 text-sm font-light">
                                {e?.chamberTimeDetails?.map((schedule, index) => (
                                  <tr
                                    key={`schedule_${index}`}
                                    className={`border-b border-gray-200 hover:bg-gray-100`}
                                  >
                                    <td className="py-3 px-4 text-left">
                                      {
                                        dayNameMap[schedule?.dayName]?.[i18n.language === "bn" ? "bn" : "en"] ||
                                        schedule?.dayName // fallback
                                      }
                                    </td>

                                    <td className="py-3 px-4 text-left">
                                      {schedule?.dayTime}
                                    </td>
                                    <td className="py-3 px-4 text-left">
                                      {schedule.eveningTime}
                                    </td>
                                    <td className="py-3 px-4 text-left">
                                      <span
                                        className={`${schedule.isOpen
                                          ? "bg-green-200 text-green-600"
                                          : "bg-red-200 text-red-600"
                                          } py-1 px-3 rounded-full text-xs`}
                                      >
                                        {schedule.isOpen ? i18n.t("Open") : i18n.t("Closed")}
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
                            <strong>{i18n.t("Fee")}:</strong> {e.fee} /=
                          </p>
                          <p>
                            <strong>{i18n.t("Follow-up")}:</strong> {e.oldPatient} /=
                          </p>
                          <p>
                            <strong>{i18n.t("Report Showing")}:</strong> {e.reportShow} /=
                          </p>
                          <p>
                            <strong>{i18n.t("Room No")}:</strong> {e.room}
                          </p>
                          <p>
                            <strong>{i18n.t("Floor")}:</strong> {e.floor}
                          </p>
                          <div className="mt-2 mb-2">
                            <button
                              onClick={handleOpen}
                              className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm flex items-center space-x-2 max-w-fit"
                              style={{ inlineSize: "auto" }}
                            >
                              <FaPhoneAlt />
                              <span>{i18n.t("Call Now")}</span>
                            </button>
                          </div>
                          <ContacTactModal
                            contact={e.phoneNumber}
                            open={showModal}
                            onClose={handleClose}
                          />
                        </div>
                      </div>
                    )
                );
              })}
            </div>
          </div>
        )}

        {activeTab === i18n.t("Experience") && (
          <div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data?.doctorExperiencelInfo?.map((experience) => (
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
                <p className="text-yellow-700">{i18n.t("No experience data available")}</p>
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
                  typeId="1"
                  onSuccess={fetchDoctorProfile}
                />
              )
            }

            {reviewData?.doctorRatingInfo?.length > 0 ? (
              <ReviewList
                reviews={reviewData?.doctorRatingInfo}
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

export default DoctorTabs;
