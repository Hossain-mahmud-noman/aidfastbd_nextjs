import React from 'react'
import AppBar from '../../../components/AppBar';
import { FaArrowLeft } from "react-icons/fa";

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { appname, base_endpoint, headerx } from '../../../utils/constants';
import AppointmentCard from '../../../components/card/AppointmentCard';

export const metadata = {
    title: "Appointment History | " + appname,
};



const fetchData = async () => {
    const tokenCookie = cookies().get('token')?.value ?? ""; // Retrieve token cookie
    const userCookie = cookies().get('user')?.value;
    const user = userCookie ? JSON.parse(userCookie) : null;

    try {
        if (tokenCookie.length === 298 && user !== null) {
            headerx['Authorization'] = `Bearer ${tokenCookie}`;
            const res = await fetch(`${base_endpoint}/GeneralInformation/GetAllBookAppointmentList?userId=${user.id}`, { method: "GET", headers: headerx });
            if (res.status == 200) {
                const data = await res.json();
                return { token: tokenCookie, user: user, data: data };
            }
            else if (res.status == 401) {
                return { token: tokenCookie, user: null, data: [] };
            }
        }
        return { token: tokenCookie, user: null, data: [] };
    } catch (err) {
        return { token: tokenCookie, user: null, data: [] };
    }

};

async function page() {

    const { token, user, data } = await fetchData();

    // If no user, redirect to login
    if (!user) {
        redirect('/login');
    }
    return (
        <>
            <AppBar leadingIcon={<FaArrowLeft className="h-5 w-5" />} title='Appointment History' ></AppBar>


            {data.length == 0 ? <div className='h-svh	l w-full flex items-center justify-center text-1xl'>Sorry! no appointments hsitory found</div> :
                <div className="pt-16 pl-2 pr-2 mt-3">
                    {data.map((e, index) => {
                        return <AppointmentCard isHistory={true} data={e} key={index}></AppointmentCard>;
                    })}
                </div>}
        </>
    )
}

export default page