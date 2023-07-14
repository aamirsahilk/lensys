import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import ReactPlayer from 'react-player'
import Image from 'next/image';
import Ratings from './Ratings';


const TestimonialDet = () => {
  return (
    <Swiper spaceBetween={15} slidesPerView={1.2} onSlideChange={() => console.log('slide change')}  className='' >
        <SwiperSlide>
            <div className="testimonial-det-wrapper">
                <div className="test-det">
                    <div className="test-pr">
                        <Image src="/src/d.png" alt="" width={60} height={60} />
                    </div>
                    <div className="test-dt">
                        <h3>Smith s.</h3>
                        <Ratings rating={5} />
                    </div>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="testimonial-det-wrapper">
                <div className="test-det">
                    <div className="test-pr">
                        <Image src="/src/d.png" alt="" width={60} height={60} />
                    </div>
                    <div className="test-dt">
                        <h3>Smith s.</h3>
                        <Ratings rating={5} />
                    </div>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="testimonial-det-wrapper">
                <div className="test-det">
                    <div className="test-pr">
                        <Image src="/src/d.png" alt="" width={60} height={60} />
                    </div>
                    <div className="test-dt">
                        <h3>Smith s.</h3>
                        <Ratings rating={5} />
                    </div>
                </div>
            </div>
        </SwiperSlide>
    </Swiper>
  )
}

export default TestimonialDet