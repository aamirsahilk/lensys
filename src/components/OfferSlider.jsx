import React, { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { Navigation } from "swiper";
import api from '@/api/api';
import Link from 'next/link';
import "swiper/css";
import "swiper/css/navigation";


const OfferSlider = ({data}) => {
    const navigationPrevRef = useRef();
    const navigationNextRef = useRef();



    return (
        <>
            <div className='le_offer-swiper'>
                <Swiper navigation={{ prevEl: navigationPrevRef.current, nextEl: navigationNextRef.current, }} spaceBetween={15} slidesPerView={4} onSlideChange={() => {}} modules={[Navigation]} className='' breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                    640: {
                        slidesPerView:1,
                        spaceBetween: 0,
                    },
                    768: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                    1024: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                }}>
                    {
                       
                       data && data.length? data.map((pr, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <div className="le_offer-link-banner">
                                        <Image src={pr.image} alt="offer" width={1920} height={300} className='w-full'/>
                                    </div>
                                </SwiperSlide>
                            )
                        }):''
                    }
                </Swiper>
             
            </div>
    
        </>
    )
}

export default OfferSlider