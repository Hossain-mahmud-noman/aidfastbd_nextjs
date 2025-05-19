import { cookies } from "next/headers";
import BottomNavigation from "../../components/BottomNavigation"
import LayoutAppBar from "../../components/LayoutAppBar";
import MoreMenu from '../../components/MoreMenu';
import { appname, map_key } from "../../utils/constants";


export const metadata = {
  title: "More | " + appname,
};


const checkLogin = async () => {
  try {
    const locationCookie = cookies().get('userLocation') ?? null;
    const tokenCookie = cookies().get('token') ?? "";
    const userCookie = cookies().get('user') ?? null;

    return { token: tokenCookie, user: userCookie, location: locationCookie !== null ? JSON.parse(locationCookie.value) : { "lat": 23.8103, "lng": 90.412, "name": "" } };

  } catch (err) {
    return { token: "", user: null, location: { "lat": 23.8103, "lng": 90.412, "name": "" } };
  }
}

async function page() {

  const { token, location } = await checkLogin();

  return (
    <>
      <LayoutAppBar  name={location.name} lat={location.lat} lng={location.lng} api_key={map_key}></LayoutAppBar>
      <div style={{ insetBlockEnd: "70px" }} className="aid-container font-[family-name:var(--font-geist-sans)]  pt-16">
        <MoreMenu token={token} />
        <BottomNavigation active="/more" />
      </div>
    </>
  )
}

export default page