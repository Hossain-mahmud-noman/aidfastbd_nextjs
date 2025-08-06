'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { base_endpoint, headerx } from '../../utils/constants';
import ProfileMenu from '../../components/ProfileMenu';

const Page = () => {
  const { user, token } = useAuth(); 
  const [data, setData] = useState(null);
  const router = useRouter();

  useEffect(() => {
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
        const res = await fetch(`${base_endpoint}/GeneralInformation/GetUserProfileInfo?userId=${user.id}`, {
          headers: authHeader,
        });
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Failed to load profile:', err);
      }
    };

    fetchUserData();
  }, [user, token, router]);

  if (!user || !token) return null; 

  return (
    <div className="pt-10 aid-container">
      {data ? <ProfileMenu data={data} /> : <p>Loading...</p>}
    </div>
  );
};

export default Page;
