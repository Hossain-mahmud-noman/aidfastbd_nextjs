import { appname } from "../../utils/constants";
import SmsLoginForm from '../../components/forms/SmsLoginForm';

export const metadata = {
  title: "SMS Login | " + appname,
};


function page() {
  return (
    <>
      <div className="py-10 aid-container">
        <SmsLoginForm />
      </div>
    </>

  )
}

export default page
