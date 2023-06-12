import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import banner1 from '../../images/banner1.jpg'
import Image from 'next/image';
import CustomButton from './CustomButton';

import 'swiper/css';

const HomeBannerArea = () => {
  return (
    <div className='home-banner-area'>
        <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        >
        <SwiperSlide>
            <div className="main-banner">
                <picture>
                    <source srcset={banner1} media="max-width:600px"/>
                    <Image src={banner1} alt="banner1" />
                </picture>
                <div className="container">
                    <div className="banner-inner-area grid grid-cols-1 lg:grid-cols-2 place-items-center">
                        <div className="banner-content">
                            <h1>
                                <span>Heavy</span> on features
                                Light on <span>price</span>
                            </h1>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            </p>
                            <CustomButton headerBtn="true">
                                <span>Shop Now</span>
                            </CustomButton>
                        </div>
                    </div>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        </Swiper>
    </div>
  )
}

export default HomeBannerArea