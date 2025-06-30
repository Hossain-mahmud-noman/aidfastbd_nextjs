import React from 'react'
import ForgetForm from '../../components/forms/ForgetForm';
import { appname } from '../../utils/constants';

export const metadata = {
  title: "Forget Password | " + appname,
};

function page() {
  return (
    <>
      <div className='py-10'>
        <ForgetForm />
      </div>
    </>
  )
}

export default page