// app/components/Swiper/index.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

const ImageSwiper = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      slidesPerView={1}
      spaceBetween={10}
      breakpoints={{
        100: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
      }}
      className="mySwiper rounded-2xl"
    >
      <SwiperSlide>
        <img
          src="/images/heroimages/charityimg1.png"
          alt=""
          className="w-[100%] rounded-2xl"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/images/heroimages/charityimg2.png"
          alt=""
          className="w-[100%] rounded-2xl"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/images/heroimages/charityimg3.png"
          alt=""
          className="w-[100%] rounded-2xl"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/images/heroimages/charityimg4.png"
          alt=""
          className="w-[100%] h-[100%] rounded-2xl"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/images/heroimages/charityimg5.png"
          alt=""
          className="w-[100%] rounded-2xl"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/images/heroimages/charityimg6.png"
          alt=""
          className="w-[100%] rounded-2xl"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/images/heroimages/charityimg7.png"
          alt=""
          className="w-[100%] rounded-2xl"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/images/heroimages/charityimg8.png"
          alt=""
          className="w-[100%] rounded-2xl"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default ImageSwiper;
