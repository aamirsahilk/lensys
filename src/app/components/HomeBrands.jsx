import React from 'react'
import SecHeading from './SecHeading'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid } from "swiper";
import Image from 'next/image';

import "swiper/css";
import "swiper/css/grid";

const HomeBrands = () => {
  return (
    <section className='sec home-brand-sec'>
        <div className="container mx-auto">
            <div className="container">
                <SecHeading centerLine={true}>
                    Brands
                </SecHeading>
                <div className="brand-swiper-container">
                    <Swiper spaceBetween={20}  slidesPerView={4} grid={{rows: 2}}  onSlideChange={() => console.log('slide change')} onSwiper={(swiper) => console.log(swiper)} modules={[Grid]} className='brand-swiper' >
                        <SwiperSlide>
                            <div className="brand-wrapper">
                                <Image src="/src/images/brand1.png" alt="brand" width={200} height={100}  />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="brand-wrapper">
                                <Image src="/src/images/brand1.png" alt="brand" width={200} height={100}  />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="brand-wrapper">
                                <Image src="/src/images/brand1.png" alt="brand" width={200} height={100}  />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="brand-wrapper">
                                <Image src="/src/images/brand1.png" alt="brand" width={200} height={100}  />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="brand-wrapper">
                                <Image src="/src/images/brand1.png" alt="brand" width={200} height={100}  />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="brand-wrapper">
                                <Image src="/src/images/brand1.png" alt="brand" width={200} height={100}  />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="brand-wrapper">
                                <Image src="/src/images/brand1.png" alt="brand" width={200} height={100}  />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="brand-wrapper">
                                <Image src="/src/images/brand1.png" alt="brand" width={200} height={100}  />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    </section>  
  )
}

export default HomeBrands