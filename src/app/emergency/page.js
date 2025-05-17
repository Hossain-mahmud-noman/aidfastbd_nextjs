import React from 'react'
import LayoutAppBar from '../../components/LayoutAppBar'
import EmergencyAidComponent from '../../components/EmergencyAidComponent'
import { appname, map_key } from "../../utils/constants"
import { FaArrowLeft } from "react-icons/fa";
import Nearest from '../../components/Nearest';



export const metadata = {
  title: "Emergency | " + appname,
};

async function page() {
  return (
    <>
      <LayoutAppBar emergency={true} leadingIcon={<FaArrowLeft className="h-5 w-5" />} api_key={map_key} />
      <div style={{ paddingBlockEnd: "70px" }} className="font-[family-name:var(--font-geist-sans)] pt-16">
        <div className='aid-container'>
          <EmergencyAidComponent />
        </div>
        <Nearest emergency={true} />
      </div>
    </>
  )
}

export default page