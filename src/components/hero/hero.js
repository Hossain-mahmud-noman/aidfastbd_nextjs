"use client";

import { useI18n } from "../../context/i18n.js";
import Image from "next/image";
import Link from "next/link";
import { FiDownload } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Keyboard, Pagination, Autoplay } from "swiper/modules";
import { useRef } from "react";
import { useRouter } from "next/navigation.js";
const Hero = () => {
  const paginationRef = useRef(null);
  const i18n = useI18n();
  const data = [
    {
      heading: "Welcome to AidFast",
      title: "All-in-One Healthcare – AidFast",
      image: "/home/hero/h1.png",
    },
    {
      heading: "Welcome to AidFast",
      title: "All-in-One Healthcare – AidFast",
      image: "/home/hero/h2.png",
    },
    {
      heading: "Welcome to AidFast",
      title: "All-in-One Healthcare – AidFast",
      image: "/home/hero/h3.png",
    },
    {
      heading: "Welcome to AidFast",
      title: "All-in-One Healthcare – AidFast",
      image: "/home/hero/h4.jpg",
    },
    {
      heading: "Welcome to AidFast",
      title: "All-in-One Healthcare – AidFast",
      image: "/home/hero/b2.jpg",
    },
  ];
  const router = useRouter();
  return (
    <div className="hero">
      <div className="bg-[#F2F4F8] w-full ">
        <Swiper
          keyboard={{ enabled: true }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            640: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 1, spaceBetween: 16 },
            1024: { slidesPerView: 1, spaceBetween: 20 },
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          speed={1000}
          loop={true}
          pagination={{
            clickable: true,
            el: paginationRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.pagination.el = paginationRef.current;
          }}
          modules={[Keyboard, Autoplay, Pagination]}
          className="w-full"
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className="w-full"
                onClick={() =>
                  (window.location.href =
                    "https://play.google.com/store/apps/details?id=com.aidfastbd.app")
                }
              >
                <Image
                  src={item.image}
                  width={3000}
                  height={3000}
                  loading="lazy"
                  alt="banner"
                  className="h-[141px] sm:h-[250px] lg:h-[380px] xl:h-[540px] 2xl:h-[700px]"
                  // className="h-[141px] sm:h-[250px] lg:h-[380px] xl:h-[340px] object-fill w-full"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div
        ref={paginationRef}
        className="custom-pagination py-4 flex justify-center"
      ></div>
    </div>
  );
};

export default Hero;
