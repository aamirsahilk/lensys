import React, {useRef} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { Navigation } from "swiper";
import ProductCard from './ProductCard';

import "swiper/css";
import "swiper/css/navigation";


const ProductImageSlider = () => {
    const navigationPrevRef = useRef();
    const navigationNextRef = useRef();

    return (
        <div className='le_pr-image-swiper'>
            
            <Swiper navigation={{prevEl: navigationPrevRef.current,nextEl: navigationNextRef.current,}} spaceBetween={15} slidesPerView={4} onSlideChange={() => console.log('slide change')} modules={[Navigation]} className='mt-14' >

                <SwiperSlide>
                    <ProductCard ImageProductCard={true} />
                </SwiperSlide>
                <SwiperSlide>
                    <ProductCard ImageProductCard={true} />
                </SwiperSlide>
                <SwiperSlide>
                    <ProductCard ImageProductCard={true} />
                </SwiperSlide>
                <SwiperSlide>
                    <ProductCard ImageProductCard={true} />
                </SwiperSlide>
                <SwiperSlide>
                    <ProductCard ImageProductCard={true} />
                </SwiperSlide>
                
            </Swiper>
            {/* <div className="sw-next" ref={navigationNextRef} />
            <div className="sw-prev" ref={navigationPrevRef} /> */}
        </div>
    )
}

export default ProductImageSlider