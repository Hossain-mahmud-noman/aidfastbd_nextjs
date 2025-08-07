'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import ProfileMenu from '../ProfileMenu';
import Loader from '../../context/loader';
import { base_endpoint, headerx } from '../../utils/constants';

const ProfilePage = () => {
  const { user, token, loading } = useAuth();
  const [data, setData] = useState(null);
  const router = useRouter();

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
    <div className="pt-10 aid-container">
      {data ? <ProfileMenu data={data} /> : <div><Loader /></div>}
    </div>
  );
};

export default ProfilePage;
