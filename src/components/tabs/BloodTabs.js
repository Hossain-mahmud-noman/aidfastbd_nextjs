"use client";
import React, { useEffect, useState } from "react";
import { base_endpoint, image_base_endpoint } from "../../utils/constants";
import ReviewList from "../ReviewList";
import { FaPhone, FaUserCircle, FaTint, FaPlus, FaEdit } from "react-icons/fa";
import ShowOriginalImage from "../list/ShowOriginalImage";
import { useI18n } from "../../context/i18n";
import PostReview from "../postReview/PostReview";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";
import { Modal, Input, Form, Button, Select } from "antd";

function BloodTabs({ data, UserId }) {

  const i18n = useI18n();
  const [reviewData, setReviewdData] = useState(data);
  const [blooddata, setBloodData] = useState(data)
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDonor, setEditingDonor] = useState(null);
  const [form] = Form.useForm();

  const bloodGroups = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
  ];

  const tabData = [
    i18n.t("Information"),
    i18n.t("Services"),
    i18n.t("Donor List"),
    i18n.t("Review"),
  ];

  useEffect(() => {
    setActiveTab(tabData[0]);
  }, [i18n]);

  const fetchBlooddata = async () => {
    try {
      const res = await fetch(
        `${base_endpoint}/GeneralWeb/GetAllBloodBankList?userId=${UserId}`,
        { cache: "no-store" }
      );
      const json = await res.json();
      setReviewdData(json?.data?.[0]);
      setBloodData(json?.data?.[0]);
    } catch (error) {
      toast.error("Failed to fetch blood bank data.");
    }
  };

  const openModal = (donor = null) => {
    setEditingDonor(donor);
    setIsModalOpen(true);
    if (donor) {
      form.setFieldsValue({
        name: donor.name,
        bloodGroup: donor.bloodGroup,
        mobileNo: donor.mobileNo,
        remarks: donor.remarks,
      });
    } else {
      form.resetFields();
    }
  };

  const handleModalSubmit = async () => {
    try {
      const values = await form.validateFields();
      const method = editingDonor ? "PUT" : "POST";
      const url = editingDonor
        ? "https://api.aidfastbd.com/api/GeneralInformation/UpdateBloodBankDoner"
        : "https://api.aidfastbd.com/api/GeneralInformation/SaveBloodBankDoner";

      const token = localStorage.getItem("token");

      const payload = {
        ...values,
        userId: blooddata?.userId,
        ...(editingDonor
          ? { id: editingDonor.id, isDelete: false }
          : { bloodBankInformationId: blooddata?.id }),
      };

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Submission failed");

      toast.success(editingDonor ? "Donor updated successfully!" : "Donor added successfully!");
      setIsModalOpen(false);
      setEditingDonor(null);
      form.resetFields();
      fetchBlooddata();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {/* Tab Buttons */}
      <div className="bg-white shadow-custom-light aid-container my-4 md:my-5 lg:my-8">
        <div className="overflow-x-auto md:overflow-x-visible">
          <div className="inline-flex md:grid md:grid-cols-4 md:w-full md:space-x-0 space-x-3">
            {tabData.map((tab) => (
              <button
                key={tab}
                className={`text-sm font-semibold whitespace-nowrap border-2 border-primary py-2 px-4 rounded-md md:rounded-none
                  ${activeTab === tab ? "text-white bg-primary" : "text-gray-500"}
                  md:flex md:justify-center`}
                onClick={() => setActiveTab(tab)}
                style={{ flex: "1 1 auto" }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Donor Modal */}
      <Modal
        title={editingDonor ? "Update Donor" : "Add Donor"}
        open={isModalOpen}
        onOk={handleModalSubmit}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingDonor(null);
          form.resetFields();
        }}
        okText={editingDonor ? "Update" : "Add"}
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input placeholder="Donor name" />
          </Form.Item>

          <Form.Item
            label="Blood Group"
            name="bloodGroup"
            rules={[{ required: true, message: "Please select blood group" }]}
          >
            <Select placeholder="Select blood group">
              {bloodGroups.map((group) => (
                <Select.Option key={group} value={group}>
                  {group}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Mobile Number"
            name="mobileNo"
            rules={[{ required: true, message: "Please enter mobile number" }]}
          >
            <Input placeholder="01XXXXXXXXX" />
          </Form.Item>
          <Form.Item label="Remarks" name="remarks">
            <Input.TextArea placeholder="Optional remarks" rows={3} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === i18n.t("Information") && (
          <div>
            {data?.bloodBankAdditionalInfo ? (
              <>
                <h3 className="font-bold text-lg text-black-600">
                  {data.bloodBankAdditionalInfo.title}
                </h3>
                <pre className="whitespace-pre-wrap">
                  {data.bloodBankAdditionalInfo.details}
                </pre>
                {data.bloodBankAdditionalInfo.imageUrl && (
                  <div className="w-full mt-3">
                    <ShowOriginalImage
                      image={image_base_endpoint + data.bloodBankAdditionalInfo.imageUrl}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                <p className="text-yellow-700">
                  {i18n.t("No information data available")}
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === i18n.t("Services") && (
          <div>
            {data?.bloodBankServices?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {data.bloodBankServices.map((service, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-md border p-5 transition hover:shadow-lg"
                  >
                    <h2 className="text-xl lg:text-2xl font-semibold text-blue-800">
                      {service?.serviceName}
                    </h2>
                    <p className="text-gray-700 text-sm lg:text-base mt-2">
                      <span className="font-medium text-gray-900"></span> {service?.price}
                    </p>
                    <div className="mt-4">
                      <ShowOriginalImage image={service?.remarks} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4 rounded">
                <p className="text-yellow-700 font-medium">
                  {i18n.t("No services data available")}
                </p>
              </div>
            )}
          </div>
        )}



        {activeTab === i18n.t("Donor List") && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3 mb-4">

              <Select
                allowClear
                showSearch
                placeholder={i18n.t("Filter by Blood Group")}
                style={{ inlineSize: 550 }}
                onChange={(value) => {
                  if (!value || value === "all") {
                    setBloodData(data);
                  } else {
                    const filteredDonors = data?.bloodBankDonerInfo?.filter(
                      (donor) => donor.bloodGroup === value
                    );
                    setBloodData({
                      ...data,
                      bloodBankDonerInfo: filteredDonors,
                    });
                  }
                }}
              >
                <Select.Option value="all">{i18n.t("All") || "All"}</Select.Option>

                {bloodGroups.map((group) => (
                  <Select.Option key={group} value={group}>
                    {group}
                  </Select.Option>
                ))}
              </Select>

              {user && (
                <Button onClick={() => openModal()} icon={<FaPlus />} type="primary">
                  {i18n.t("Add Donor")}
                </Button>
              )}
            </div>

            {blooddata?.bloodBankDonerInfo?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-6">
                {blooddata.bloodBankDonerInfo.map((donor) => (
                  <div
                    key={donor.id}
                    className="bg-white rounded-lg shadow-custom-light p-4 relative"
                  >
                    {
                      (donor?.creatorId == user?.userId || donor?.ownerId == user?.userId) && (
                        <Button
                          icon={<FaEdit />}
                          onClick={() => openModal(donor)}
                          className="absolute bottom-1/2 right-2"
                        >
                          {i18n.t("Edit Donor")}
                        </Button>
                      )

                    }
                    <div>
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
                      <div className="mt-3 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-red-50 to-red-100">
                        <div className="flex items-center space-x-1">
                          <FaTint className="w-4 h-4 text-red-500" />
                          <span className="text-sm font-bold text-red-500">
                            {donor.bloodGroup}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                <p className="text-yellow-700">{i18n.t("No donor data available")}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === i18n.t("Review") && (
          <>
            {user && (
              <PostReview
                profileUserId={reviewData?.userId}
                typeId="3"
                onSuccess={fetchBlooddata}
              />
            )}
            {reviewData?.bloodBankReview?.length > 0 ? (
              <ReviewList
                reviews={reviewData?.bloodBankReview}
                averageRating={reviewData?.averageRating}
                totalRatings={reviewData?.totalRating}
              />
            ) : (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                <p className="text-yellow-700">{i18n.t("No review data available")}</p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default BloodTabs;
