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
      <div className=" pt-10">
        <div className='aid-container'>
          <EmergencyAidComponent />
        </div>
        <Nearest emergency={true} />
      </div>
    </>
  )
}

export default page