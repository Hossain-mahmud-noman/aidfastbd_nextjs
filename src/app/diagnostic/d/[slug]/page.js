import { notFound } from 'next/navigation';
import {  appname, frontend_url, headerx, panel_base } from '../../../../utils/constants'
import DiagnosticDetail from "../../../../components/DiagnosticDetail"
import AppBar from '../../../../components/AppBar';
import { FaArrowLeft } from "react-icons/fa";
import ShareButton from '../../../../components/ShareButton';
import DiagnosticTabs from '../../../../components/tabs/DiagnosticTabs';
import { cookies } from 'next/headers';
import FavouriteToggle from '../../../../components/FavouriteToggle';
import FloatingCallButton from '../../../../components/FloatingCallButton';
import ProfileQR from '../../../../components/profileQR';

export const metadata = {
  title: null,
  description: null,
};

const fetchDetail = async (slug) => {
  try {
    const tokenCookie = cookies().get('token')?.value ?? "";
    const userCookie = cookies().get('user')?.value;
    const user = userCookie ? JSON.parse(userCookie) : null;

    if (tokenCookie.length === 298) {
      headerx['Authorization'] = `Bearer ${tokenCookie}`
    }
    const response = await fetch(`${panel_base}/diagnostic/${slug}`, {
      method: "GET",
      headers: headerx,
      cache: "no-store"

    });
    
    if (response.status == 200) {
      const data = await response.json();

      return { token: tokenCookie, user: user, data: data['data'][0] };
    } else {
      return { token: tokenCookie, user: user, data: null };
    }

  } catch (err) {
    return { token: null, user: user, data: null };
  }
}


async function page({ params }) {
  const { data, token, user } = await fetchDetail(params.slug);

  if (data == null) {
    notFound();
  }



  return (
    <>

      <title>{`${data.name}  | ${appname}`}</title>
      <meta name="description" content={`${data.meta_description}`} />

      <AppBar leadingIcon={<FaArrowLeft className="h-5 w-5" />} title='Diagnostic Detail' trailingComponents={
        <div className='flex'>
          <ProfileQR userId={data.userId} type={"Diagnostic"}></ProfileQR>

          <FavouriteToggle isFill={data.isFavourite} userId={user?.id} id={data.userId} type={2} token={token}  ></FavouriteToggle>
          <ShareButton link={`${frontend_url}/diagnostic/${data.userId}`}></ShareButton>
        </div>}></AppBar>

      <div className="pt-16">

        <DiagnosticDetail data={data}></DiagnosticDetail>

      </div>

      <DiagnosticTabs data={data}></DiagnosticTabs>
      <FloatingCallButton number={data.contact}></FloatingCallButton>

    </>
  )
}

export default page


