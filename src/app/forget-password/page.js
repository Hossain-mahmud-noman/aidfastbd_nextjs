import React from 'react'
import ForgetForm from '../../components/forms/ForgetForm';
import AppBar from '../../components/AppBar';
import { FaArrowLeft } from "react-icons/fa";
import { appname } from '../../utils/constants';


export const metadata = {
  title: "Forget Password | " + appname,
};

function page() {
  return (
    <>
          <AppBar leadingIcon={<FaArrowLeft className="h-5 w-5" />} title='Forget Password' ></AppBar>
         <div className='pt-16'>
         <ForgetForm></ForgetForm>
         </div>
    </>
  )
}

export default page