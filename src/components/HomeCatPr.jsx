import React from 'react'
import SecHeading from './SecHeading'
import CustomButton from './CustomButton'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import ProductCard from './ProductCard';

const HomeCatPr = () => {
    return (
        <section className='home-cat-pr-sec sec'>
            <div className="container mx-auto">
                <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="relative">
                        <ul className="home-cat-list">
                            <li>
                                <button className='active'>
                                    <span>Latest picks</span>
                                </button>
                            </li>
                            <li>
                                <button>
                                    <span>Latest picks</span>
                                </button>
                            </li>
                            <li>
                                <button>
                                    <span>Latest picks</span>
                                </button>
                            </li>
                            <li>
                                <button>
                                    <span>Latest picks</span>
                                </button>
                            </li>
                            <li>
                                <button>
                                    <span>Latest picks</span>
                                </button>
                            </li>
                            <li>
                                <button>
                                    <span>Latest picks</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="relative lg:col-span-3">
                        <div className="cat-pr-right-area">
                            <div className="top-head-area flex justify-between items-center flex-wrap gap-2 md:gap-8">
                                <SecHeading>
                                    <span>Latest</span> picks
                                </SecHeading>
                                <CustomButton arrow={true}>
                                    <span>View All</span>
                                </CustomButton>
                            </div>
                            <div className="home-cat-pr-slider">
                                <Swiper 
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
                                        slidesPerView: 3,
                                        spaceBetween: 10,
                                    },
                                }}
                                >
                                    <SwiperSlide>
                                        <ProductCard />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <ProductCard />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <ProductCard />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <ProductCard />
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomeCatPr