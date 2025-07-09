import { appname } from "../../utils/constants";

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
