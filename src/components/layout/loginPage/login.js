'use client'

import { Dropdown } from 'antd';
import Link from 'next/link';
import { FaUserDoctor } from 'react-icons/fa6';
import { useI18n } from '../../../context/i18n';
import Image from 'next/image';
import { useAuth } from '../../../context/AuthContext';
import { image_base_endpoint } from '../../../utils/constants';
const Login = () => {
  const { user, logout } = useAuth();
  const fullImageUrl = `${image_base_endpoint}${user?.imageUrl}`;
  const i18n = useI18n();

  const items = [
    {
      key: '1',
      label: <Link href="/profile">{i18n.t("Profile")}</Link>,
    },
    {
      key: '2',
      label: (
        <Link href='/appointments' className="w-full text-left">
          {i18n.t("Appoinments")}
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <button href='/more' className="w-full text-left">
          {i18n.t("More Menu")}
        </button>
      ),
    },
    {
      key: '4',
      label: (
        <button onClick={logout} className="w-full text-left">
          {i18n.t("Logout")}
        </button>
      ),
    },
  ];

  return (
    <div>
      {user ? (
        <Dropdown menu={{ items }} trigger={['hover']} placement="bottomRight">
          <div className="cursor-pointer h-6 w-6 md:h-8 md:w-8 rounded-full bg-primary flex items-center justify-center overflow-hidden">
            {
              fullImageUrl ?
                <Image
                  src={fullImageUrl}
                  width={100}
                  height={100}
                  alt='user'
                /> :
                <FaUserDoctor className="text-white" />
            }
          </div>
        </Dropdown>
      ) : (
        <Link href="/login">
          <div className="border rounded-full text-white bg-primary  md:px-4 md:py-2 px-2 py-1">
            <p className="text-xs lg:text-base">{i18n.t("login")}</p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Login;
