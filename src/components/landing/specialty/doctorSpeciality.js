'use client';

import React, { useEffect, useState } from 'react';
import DoctorCategory from '../../../components/category/DoctorCategory.js';

const DoctorSpeciality = () => {
  const [specialityData, setSpecialityData] = useState([]);
  

  useEffect(() => {
    const fetchSpecialityData = async () => {
      try {
        const res = await fetch(
          'https://api.aidfastbd.com/api/Dropdown/GetSpecialityDropDownList'
        );
        if (res.ok) {
          const data = await res.json();
          setSpecialityData(data);
        } else {
          setSpecialityData([]);
        }
      } catch (err) {
        setSpecialityData([]);
      }
    };

    fetchSpecialityData();
  }, []);
console.log("🚀 ~ DoctorSpeciality ~ specialityData:", specialityData)
  return (
    <div className="aid-container pt-10">
      <DoctorCategory specialityData={specialityData} />
    </div>
  );
};

export default DoctorSpeciality;
