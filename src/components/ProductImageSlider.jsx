import React, { useRef, useState, useEffect, useCallback } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { Navigation } from "swiper";
import ProductCard from './ProductCard';
import api from '@/api/api';
import Link from 'next/link';
import "swiper/css";
import "swiper/css/navigation";


const ProductImageSlider = ({lenstype}) => {
    const navigationPrevRef = useRef();
    const navigationNextRef = useRef();

    const [products, setProducts] = useState(null)
 
    const fetchCategories = useCallback(async() =>{
        const res = await api.get(`products/${lenstype}`);
        setProducts(res.data)
    },[])

    useEffect(() =>{
        fetchCategories();
    },[fetchCategories])

    return (
        <>
            <div className='le_pr-image-swiper'>

                <Swiper navigation={{ prevEl: navigationPrevRef.current, nextEl: navigationNextRef.current, }} spaceBetween={15} slidesPerView={4} onSlideChange={() => console.log('slide change')} modules={[Navigation]} className='mt-5 pb-5' breakpoints={{
                    0: {
                        slidesPerView: 1,
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
                }}>
                    {
                        // [...Array(8)].map((item, index) => (
                        //     <SwiperSlide key={index}>
                        //         <ProductCard ImageProductCard={true} />
                        //     </SwiperSlide>
                        // ))
                        products && products.length? products.map((product, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <ProductCard data={product} />
                                </SwiperSlide>
                            )
                        }):<p className='no-res'>No Results</p>
                    }
                </Swiper>
                {/* <div className="sw-next" ref={navigationNextRef} />
                <div className="sw-prev" ref={navigationPrevRef} /> */}
            </div>
            {
                products &&
                products.length ?
                <Link href={`/products/${lenstype}`} className="main-btn center">
                    <span>View All</span>
                </Link>:''
            }
        </>
    )
}

export default ProductImageSlider