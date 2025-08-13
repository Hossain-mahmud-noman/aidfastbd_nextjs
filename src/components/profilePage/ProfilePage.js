'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import ProfileMenu from '../ProfileMenu';
import Loader from '../../context/loader';
import { base_endpoint, headerx } from '../../utils/constants';
import AppBar from '../AppBar';
import { FaArrowLeft } from 'react-icons/fa6';
import { useI18n } from '../../context/i18n';

const ProfilePage = () => {
  const { user, token, loading } = useAuth();
  const [data, setData] = useState(null);
  const router = useRouter();
  const i18n = useI18n()

  useEffect(() => {
    if (loading) return;

    if (!user || !token) {
      router.push('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        const authHeader = {
          ...headerx,
          Authorization: `Bearer ${token}`,
        };
        const res = await fetch(`${base_endpoint}/GeneralInformation/GetUserProfileInfo?userId=${user.userId}`, {
          headers: authHeader,
        });
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Failed to load profile:', err);
      }
    };

    fetchUserData();
  }, [user, token, loading, router]);

  if (loading) return <p>Loading auth...</p>;
  if (!user || !token) return null;

  return (
    <div className="aid-container">
      <AppBar leadingIcon={<FaArrowLeft className="h-5 w-5" />} title={i18n.t("Profile")} />
      {data ?
        <div className='mt-5 lg:mt-6 p-4 shadow-custom-light'>
          <ProfileMenu data={data} />
        </div>
        :
        <div><Loader /></div>}
    </div>
  );
};

export default ProfilePage;
