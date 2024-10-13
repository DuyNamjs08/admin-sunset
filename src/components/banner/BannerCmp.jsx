/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./style.css";

import { Navigation } from "swiper/modules";

export default function BannerCmp({ dataProductId }) {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        scrollbar={{ draggable: true }}
        // onSlideChange={(swiper) => {
        //   setSelectedImage(swiper.activeIndex);
        // }}
      >
        {dataProductId &&
          dataProductId.image.split(",").map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt={`Slide ${index}`} />
            </SwiperSlide>
          ))}
      </Swiper>
      {
        <div className="flex gap-2 mt-4">
          {dataProductId &&
            dataProductId.image.split(",").map((item, index) => (
              <div key={index} className="relative w-[100px]">
                <div
                  className={`absolute top-0 left-0 w-[100%] h-[100%] `}
                ></div>
                <img
                  className="object-contain w-[100px] "
                  src={item}
                  alt="Selected"
                />
              </div>
            ))}
        </div>
      }
    </>
  );
}
