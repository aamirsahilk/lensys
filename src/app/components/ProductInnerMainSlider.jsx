import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';

import "swiper/css";
import "swiper/css/navigation";

const ProductInnerMainSlider = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-6 gap-2 le_pr-inner-main-slider'>
        <div className="relative">
        <Swiper
            direction={"vertical"}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            breakpoints={{
                0: {
                    slidesPerView: 3.5,
                    spaceBetween: 10,
                },
                640: {
                    slidesPerView: 3.5,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                },
            }}
            >
                {
                    [...Array(5)].map((item, index)=>{
                        return (
                            <SwiperSlide key={index}>
                                <div className="le_pr-inner-image-block">
                                    <Image src="/ds.jpg" alt="" width={100} height={100} />
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
        
            </Swiper>
        </div>
        <div className="relative col-span-5">
            <div className="main-image-show">
                <Image src="" alt="" width={500} height={500} />
            </div>
        </div>
    </div>
  )
}

export default ProductInnerMainSlider