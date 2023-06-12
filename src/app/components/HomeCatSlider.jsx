
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';

import "swiper/css";

const HomeCatSlider = () => {
    const data = [
        {
            name : "Glasses",
            link : "https//google.com",
            image : "/glass1.png",
            color: "#EFD3D7"
        },
        {
            name : "Sunglasses",
            link : "https//google.com",
            image : "/glass1.png",
            color: "#EFF7F6"
        },
        {
            name : "Kids eyewear",
            link : "https//google.com",
            image : "/glass1.png",
            color: "#E7FEE9"
        },
        {
            name : "Contact Lenses",
            link : "https//google.com",
            image : "/glass1.png",
            color: "#E3DDD6"
        },
    ]
    return (
        <div className='home-cat-area'>
            <Swiper
            spaceBetween={10}
            slidesPerView={4}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            breakpoints={{
                0: {
                    slidesPerView: 1.5,
                    spaceBetween: 10,
                },
                640: {
                    slidesPerView: 1.5,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                },
            }}
            >
                {
                    data.map(dt=>{
                        return (
                            <SwiperSlide key={dt.name}>
                                <Link href="" className='home-cat-card' style={{background: dt.color}}>
                                    <div className="im">
                                        <Image src={dt.image} alt={dt.name} width={100} height={100} />
                                    </div>
                                    <span className='shadow'>{dt.name}</span>
                                </Link>
                            </SwiperSlide>
                        )
                    })
                }
        
            </Swiper>
        </div>
      )
}

export default HomeCatSlider