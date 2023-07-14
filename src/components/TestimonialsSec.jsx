import React from 'react'
import TestimonialVideo from './TestimonialVideo'
import SecHeading from './SecHeading'
import TestimonialDet from './TestimonialDet'

const TestimonialsSec = () => {
  return (
    <section className='sec testimonial-sec'>
        <div className="container mx-auto">
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-14">
                <div className="relative">
                    <TestimonialVideo />
                </div>  
                <div className="relative">
                  <SecHeading>
                    <span>What do customers say about our product!</span>
                  </SecHeading>
                    <div className="test-nav">
                      <div className="swiper-button-prev"></div>
                      <div className="swiper-button-next"></div>
                    </div>
                  <TestimonialDet />
                </div>
            </div>
        </div> 
    </section>
  )
}

export default TestimonialsSec