import { appname } from "../../utils/constants";
import RegistrationForm from '../../components/forms/RegistrationForm';
export const metadata = {
  title: "Registration | " + appname,
};

function page() {
  return (
    <>
      <div className="py-1o">
      <RegistrationForm />
      </div>
    </>
  )
}

export default page