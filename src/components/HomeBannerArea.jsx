'use client'
import React, {useEffect, useState} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import banner1 from '../../public/images/banner1.jpg'
// import banner1 from '../images/banner1.jpg'
import Link from 'next/link';
import Image from 'next/image';
import api from '@/api/api';
import CustomButton from './CustomButton';

import 'swiper/css';

const HomeBannerArea = ({data}) => {
    const [banners,setBanners] = useState([]);
    const [isClient,setIsClient] = useState(false);
    const fetchBanner = async()=>{
        const res = await api.get('/banner/1');
        setBanners(res.data)
    }
    useEffect(() => {
        fetchBanner();
        setIsClient(true);
    },[])
    return (
    <div className='home-banner-area'>
       
        <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => {}}
        onSwiper={(swiper) => {}}
        >
        {
            banners?.map((banner,index) => (
                <SwiperSlide key={index}>
                    <Link href={banner.link} className="main-banner">
                        <picture>
                            <source srcet={banner.phone} media="max-width:600px"/>
                            <Image src={banner.image} width={1920} height={700} alt={banner.alttext} />
                        </picture>
                        {/* <div className="container">
                            <div className="banner-inner-area grid grid-cols-1 lg:grid-cols-2 place-items-center">
                                <div className="banner-content">
                                    <h1>
                                        <span>Heavy</span> on features
                                        Light on <span>price</span>
                                    </h1>
                                    <p>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    </p>
                                    <CustomButton headerBtn="true">
                                        <span>Shop Now</span>
                                    </CustomButton>
                                </div>
                            </div>
                        </div> */}
                    </Link>
                </SwiperSlide>
            ))
        }
        </Swiper>
    </div>
  )
}

// export const getServerSideProps = async () => {
//     const res = await api.get('/banner/1');
//     const data = await res.data.json();
//     return { props: { data: res.data } }
//   }
export default HomeBannerArea