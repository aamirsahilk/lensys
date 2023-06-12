import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import ReactPlayer from 'react-player'

const TestimonialVideo = () => {
    const [domLoaded, setDomLoaded] = useState(false); 
    useEffect(()=>{
        setDomLoaded(true);
    }, [])
  return (
    <Swiper spaceBetween={15} slidesPerView={1.2} onSlideChange={() => console.log('slide change')}  className='' >
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