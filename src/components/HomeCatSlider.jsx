
import React, {useState, useEffect} from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';

import glasses from '../images/glasses.png'
import sunglasses from '../images/sunglasses.png'
import kidseyewear from '../images/kidseyewear.png'
import contactlenses from '../images/contactlenses.png'

import api from '@/api/api';

import "swiper/css";

const HomeCatSlider = () => {
    const [categories, setCatagories] = useState(null)
 
    const fetchCategories = async() =>{
        const response = await api.get('categories');
        setCatagories(response.data)
    }

    useEffect(() =>{
        fetchCategories();
    },[])
  
    return (
        <div className='home-cat-area'>
            <Swiper
            spaceBetween={10}
            slidesPerView={4}
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={}
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
                    categories?.map((dt, index)=>{
                        return (
                            <SwiperSlide key={dt.id}>
                                <Link href={`products/${dt.id}`} className='home-cat-card' data-index={`c-${index}`} style={{background: dt.color}}>
                                    <div className="im">
                                        <Image src={dt.image} alt={dt.alt_text} width={100} height={100} />
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