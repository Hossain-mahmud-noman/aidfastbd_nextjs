import { appname } from "../../utils/constants";
import LoginPageClient from "./LoginPageClient";

export const metadata = {
  title: "Login | " + appname,
};

export default function Page() {
  return (
    <div className="py-10 aid-container">
      <LoginPageClient />
    </div>
  );
}
