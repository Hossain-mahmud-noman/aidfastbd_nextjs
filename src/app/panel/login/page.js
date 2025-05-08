import { appname } from "../../../utils/constants";
import PanelLoginForm from '../../../components/forms/PanelLoginForm';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Panel Login | " + appname,
};


// Function to check if the user is logged in
const checkPanelLogin = async () => {
  const tokenCookie = cookies().get('panel_token')?.value ?? ""; // Retrieve token cookie
  const is_adminCookie = cookies().get('panel_is_admin')?.value;
  return { token: tokenCookie, is_admin: is_adminCookie };
};

async function Page() {
  const { token, is_admin } = await checkPanelLogin();
  // If no user, redirect to login
  if (token) {
    redirect('/panel');
  }

  return (
    <>
      <PanelLoginForm ></PanelLoginForm>
    </>

  )
}

export default Page;

