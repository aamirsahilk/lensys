
import React, {useState, useEffect} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

import pr from '../../images/spec1.png'

import 'swiper/css';

const StepProduct = () => {
  return (
    <article className="le_step-product">
            <div className="le_pr-image-carousel">
                <Swiper
                    spaceBetween={0}
                    slidesPerView={1}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    <SwiperSlide>
                        <div className="le_pr-image">
                            <Image src={pr} width={300} height={300} alt="" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="le_pr-image">
                            <Image src={pr} width={300} height={300} alt="" />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className="le_pr-con-wrap">
                <div className="le_pr-content">
                    <h3 className='le_pr-title'>Vincent Chase Online</h3>
                    <p className='le_pr-para'>Size: Medium • Classic Acetate</p>
                    <div className="le_pr-price">
                        <h3>₹999 <span>+ tax</span></h3>
                    </div>
                </div>
            </div>
        </article>
  )
}

export default StepProduct