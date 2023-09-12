import React, {useEffect, useState} from 'react'
import SecHeading from './SecHeading'
import CustomButton from './CustomButton'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Link from 'next/link';

import api from '@/api/api';

import ProductCard from './ProductCard';

const HomeCatPr = () => {

    const [categories, setCatagories] = useState(null)
    const [products, setProducts] = useState(null)
    const [id, setId] = useState(null)
 
    const fetchCategories = async() =>{
        const response = await api.get('categories');
        setCatagories(response.data)

        const id = response.data[0].id || null;
        if(id) {
            const res = await api.get(`featured-products/${id}`);
            setProducts(res.data)

            setId(id)
        }
    }

    const handleCat = async (e)=>{
        const id = e.target.dataset.id;
        
        const response = await api.get(`featured-products/${id}`);
        setId(id)
        setProducts(response.data)
      
    }

    useEffect(() =>{
        fetchCategories();
    },[])

    return (
        <section className='home-cat-pr-sec sec'>
            <div className="container mx-auto">
                <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="relative">
                        <ul className="home-cat-list">
                            {categories && categories.map((category, index) => {
                                return (
                                    <li key={index}>
                                        <button className={category.id == id?'active':''} data-id={category.id} onClick={(e)=>handleCat(e)}>
                                            <span>{category.name}</span>
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="relative lg:col-span-3">
                        <div className="cat-pr-right-area">
                            <div className="top-head-area flex justify-between items-center flex-wrap gap-2 md:gap-8">
                                <SecHeading>
                                    <span>Latest</span> picks
                                </SecHeading>
                                <Link href={`products/${id}`} className='main-btn'>
                                    <span>View All</span>
                                </Link>
                                {/* <CustomButton arrow={true}>
                                    <span>View All</span>
                                </CustomButton> */}
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
                                    {products && products.length? products.map((product, index) => {
                                        return (
                                            <SwiperSlide key={index}>
                                                <ProductCard data={product} />
                                            </SwiperSlide>
                                        )
                                    }):<p className='no-res'>No Results</p>}
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