import { appname } from "../../utils/constants";
import AppBar from '../../components/AppBar';
import { FaArrowLeft } from "react-icons/fa";

import LoginForm from '../../components/forms/LoginForm';

export const metadata = {
  title: "Login | " + appname,
};


function page() {
  return (
    <>
      <AppBar leadingIcon={<FaArrowLeft className="h-5 w-5" />} title='Login' ></AppBar>
      <div className="pt-16 aid-container">
        <LoginForm />
      </div>
    </>

  )
}

export default page
