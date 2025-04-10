import { appname } from "../../utils/constants";
import AppBar from '../../components/AppBar';
import { FaArrowLeft } from "react-icons/fa";

import SmsLoginForm from '../../components/forms/SmsLoginForm';

export const metadata = {
  title: "SMS Login | " + appname,
};


function page() {
  return (
    <>
      <AppBar leadingIcon={<FaArrowLeft className="h-5 w-5" />} title='Login by using mobile number' ></AppBar>
      <div className="pt-16">
        <SmsLoginForm></SmsLoginForm>
      </div>
    </>

  )
}

export default page
