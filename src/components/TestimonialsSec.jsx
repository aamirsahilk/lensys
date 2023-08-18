'use client'
import React, {useRef, useCallback, useState} from 'react'
import TestimonialVideo from './TestimonialVideo'
import SecHeading from './SecHeading'
import TestimonialDet from './TestimonialDet'
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import Image from 'next/image';
import Ratings from './Ratings';

const TestimonialsSec = () => {
  const sliderRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const handlePrev = useCallback(() => {
    if (!swiperInstance) return;
    swiperInstance.slidePrev();
    setActiveIndex(swiperInstance.activeIndex);
  }, [swiperInstance]);

  const handleNext = useCallback(() => {
    if (!swiperInstance) return;
    swiperInstance.slideNext();
    setActiveIndex(swiperInstance.activeIndex);
  }, [swiperInstance]);

  return (
    <section className='sec testimonial-sec'>

      <div className="container mx-auto">
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-14">
          <div className="relative">
            <TestimonialVideo index={activeIndex} />
          </div>
          <div className="relative">
            <SecHeading>
              <span>What do customers say about our product!</span>
            </SecHeading>
            <div className="test-nav">
              <div className="swiper-button-prev" onClick={handlePrev}></div>
              <div className="swiper-button-next" onClick={handleNext}></div>
            </div>
            <Swiper spaceBetween={15} slidesPerView={1.2} onSwiper={(swiper)=>{setSwiperInstance(swiper)}} onSlideChange={() => {}} className=''>
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
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSec