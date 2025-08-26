'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Keyboard, Navigation } from "swiper/modules";
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import { useI18n } from '../../../context/i18n';
import { useRouter } from 'next/navigation';

const DoctorSpeciality = () => {
  const [specialityData, setSpecialityData] = useState([]);
  const swiperRef = useRef(null);
  const router = useRouter()
  const i18n = useI18n()
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
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.update();
    }
  }, []);

  const Next = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const Previous = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };
  return (
    <div className="aid-container mt-10 md:mt-14 lg:mt-20 xl:mt-[120px]">
      <h1 className="service-heading  text-center text-[#252525]">{i18n.t("Find doctors by specialty")}</h1>
      <div className="w-full mt-7 md:mt-9 lg:mt-12">
        <div className="w-full">
          <div className="w-full relative">
            <button
              onClick={Previous}
              className="absolute bottom-1/2 left-0 z-50 transition-all duration-300 border bg-primary border-[#D7D7D7] text-white flex items-center justify-center w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full shadow-md"
            >
              <GoArrowLeft size={20} />
            </button>

            <Swiper
              keyboard={{ enabled: true }}
              slidesPerView="auto"
              spaceBetween={12}
              loop={true}
              mousewheel={true}
              modules={[Keyboard, Navigation]}
              ref={swiperRef}
              className="w-full !py-1"
            >
              {specialityData.map((speciality, index) => (
                <SwiperSlide key={index} className="!w-auto">
                  <div
                    onClick={async () => {
                      router.push(`/doctor?value=${speciality?.text}`)
                    }}
                    className={`cursor-pointer flex-shrink-0 w-[100px] h-[140px] md:w-[120px] md:h-[180px] lg:w-[150px] lg:h-[220px] bg-white shadow-custom-light rounded-lg p-1`}
                  >
                    <Image
                      width={150}
                      height={150}
                      src={speciality.imageUrl}
                      alt={speciality.text}
                      className="w-full object-cover rounded-t-lg"
                    />
                    <div className="mt-2 md:mt-3 lg:mt-4 text-center">
                      {/* language */}
                      <p className="text-[8px] md:text-xs lg:text-sm font-semibold">
                        {
                          i18n?.language == 'bn' ? speciality.textBn : speciality.text
                        }
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              onClick={Next}
              className="absolute bottom-1/2 right-0 z-50 transition-all duration-300 border bg-primary border-[#D7D7D7] text-white flex items-center justify-center w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full shadow-md"
            >
              <GoArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSpeciality;
