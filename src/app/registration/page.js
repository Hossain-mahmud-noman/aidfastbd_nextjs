import { appname } from "../../utils/constants";
import AppBar from '../../components/AppBar';
import { FaArrowLeft } from "react-icons/fa";
import RegistrationForm from '../../components/forms/RegistrationForm';

export const metadata = {
  title: "Registration | " + appname,
};

function page() {
  return (
    <>
      <AppBar leadingIcon={<FaArrowLeft className="h-5 w-5" />} title='Registration' ></AppBar>
      <div className="pt-16">
      <RegistrationForm></RegistrationForm>
      </div>
    </>

  )
}

export default page