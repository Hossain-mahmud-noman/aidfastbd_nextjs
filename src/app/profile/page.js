import { appname } from '../../utils/constants';
import ProfilePage from "../../components/profilePage/ProfilePage"
export const metadata = {
  title: 'Profile | ' + appname,
};


export default function Page() {
  return <ProfilePage />;
}
