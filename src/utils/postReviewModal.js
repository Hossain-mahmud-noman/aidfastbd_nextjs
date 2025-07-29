// File: components/PostReview.js
'use client';

import React, { useEffect, useState } from 'react';
import { Modal, Button, Rate, Input } from 'antd';
import { toast } from 'sonner';
import { useI18n } from '../context/i18n';
import { getUserProfile } from '../context/getUserProfile';

const PostReviewModal = ({ profileUserId, open, onClose }) => {
   const [star, setStar] = useState(0);
   const [remarks, setRemarks] = useState('');
   const [loading, setLoading] = useState(false);

   const [token, setToken] = useState("");
   const [user, setUser] = useState(null);
   const i18n = useI18n()

   const fetchProfle = async() => {
      const profile = await getUserProfile();
      setUser(profile)

   }

   useEffect(() => {
      const tokenCookie = localStorage.getItem("token") ?? "";
      fetchProfle()
      setToken(tokenCookie);
   }, [token]);

   const handleSubmit = async () => {
      if (!star || !remarks) {
         toast.error(i18n.t('Please provide a rating and a comment.'));
         return;
      }

      const reviewData = {
         userId: user.id,
         profileUserId: profileUserId,
         typeId: 0,
         reviewDate: new Date().toISOString(),
         star: star,
         remarks: remarks,
         isDeleted: false,
      };

      setLoading(true);
      try {
         const res = await fetch('https://api.aidfastbd.com/api/GeneralInformation/ReviewInformationSaveUpdate', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(reviewData),
         });

         if (!res.ok) throw new Error('Failed to post review');

         toast.success(i18n.t('Review submitted successfully!'));
         setRemarks('');
         setStar(0);
         onClose();
      } catch (err) {
         toast.error(i18n.t('Something went wrong.'));
      } finally {
         setLoading(false);
      }
   };

   return (
      <Modal
         title={i18n.t("Give Review")}
         open={open}
         onCancel={onClose}
         footer={[
            <Button key="cancel" onClick={onClose}>
               {i18n.t("Cancel")}
            </Button>,
            <Button
               key="submit"
               type="primary"
               loading={loading}
               onClick={handleSubmit}
            >
               {i18n.t("Submit")}
            </Button>,
         ]}
      >
         <div className="space-y-4">
            <div>
               <label className="font-medium">{i18n.t('Rating')}</label> <br />
               <Rate value={star} className='text-primary' onChange={(value) => setStar(value)} />
            </div>
            <div>
               <label className="font-medium">{i18n.t("Comment")}</label>
               <Input.TextArea
                  rows={4}
                  placeholder={i18n.t("Write your feedback here...")}
                  value={remarks}
                  required
                  onChange={(e) => setRemarks(e.target.value)}
               />
            </div>
         </div>
      </Modal>
   );
};

export default PostReviewModal;
