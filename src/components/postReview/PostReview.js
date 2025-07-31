'use client';
import React, { useState } from "react";
import { FiStar } from "react-icons/fi";
import PostReviewModal from "../../utils/postReviewModal"; 
import { useI18n } from "../../context/i18n";

const PostReview = ({ profileUserId, typeId, onSuccess }) => {
  const i18n = useI18n();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 my-5 bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 transition"
      >
        <FiStar />
        <span>{i18n.t("Give Review")}</span>
      </button>

      <PostReviewModal
        profileUserId={profileUserId}
        typeId={typeId}
        open={showModal}
        onSuccess= {onSuccess}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default PostReview;
