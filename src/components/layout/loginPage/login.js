'use client'

import { Dropdown } from 'antd';
import Link from 'next/link';
import { FaUserDoctor } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useI18n } from '../../../context/i18n';
import handleLogout from '../../../context/logout'
const Login = () => {
  const [user, setUser] = useState(null);
  const i18n = useI18n();
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setUser(storedUser);
  }, [i18n]);


  const items = [
    {
      key: '1',
      label: <Link href="/profile">Profile</Link>,
    },
    {
      key: '2',
      label: (
        <button onClick={() => handleLogout(router)} className="w-full text-left">
          Logout
        </button>
      ),
    },
  ];

  return (
    <div>
      {user ? (
        <Dropdown menu={{ items }} trigger={['hover']} placement="bottomRight">
          <div className="cursor-pointer h-6 w-6 md:h-8 md:w-8 rounded-full bg-primary flex items-center justify-center">
            <FaUserDoctor className="text-white" />
          </div>
        </Dropdown>
      ) : (
        <Link href="/login">
          <div className="border rounded-md text-white bg-primary md:px-2 px-1 py-1">
            <p className="text-xs md:text-base">login</p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Login;
