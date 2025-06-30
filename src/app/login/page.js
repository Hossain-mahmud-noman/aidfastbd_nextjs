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
      <div className="py-10 aid-container">
        <LoginForm />
      </div>
    </>

  )
}

export default page
