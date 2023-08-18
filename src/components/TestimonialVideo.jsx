'use client'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import ReactPlayer from 'react-player'

const TestimonialVideo = ({index}) => {
    const [domLoaded, setDomLoaded] = useState(false); 
    const [swiperIn, setSwiperIn] = useState(null); 
    useEffect(()=>{
        setDomLoaded(true);
    }, [])
    useEffect(()=>{
        if(swiperIn){
            swiperIn.slideTo(index)
        }
    },[index,swiperIn])
  return (
    <Swiper onSwiper={(swiper)=>setSwiperIn(swiper)} spaceBetween={15} slidesPerView={1.2} onSlideChange={() =>{}}  className='' >
        <SwiperSlide>
            <div className="testimonial-video-wrapper">
                <div className="testimonial-video-container">
                    {domLoaded?<ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />:''}
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="testimonial-video-wrapper">
                <div className="testimonial-video-container">
                    {domLoaded?<ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />:''}
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="testimonial-video-wrapper">
                <div className="testimonial-video-container">
                    {domLoaded?<ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />:''}
                </div>
            </div>
        </SwiperSlide>
    </Swiper>
  )
}

export default TestimonialVideo