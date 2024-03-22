
import React, {useState, useEffect, useCallback} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

import { useSelector } from 'react-redux';


import pr from '../../images/spec1.png'
import api from '@/api/api';

import 'swiper/css';

const StepProduct = ({id,colorId}) => {
    const productAddedInCart = useSelector((state)=> state.productAddedInCart.value)
    const [product,setProduct] = useState(null); 
    const productData = useSelector((state)=> state.productData.value );
    const fetchProduct = useCallback(async ()=>{
        const response = await api.get(`productname?productid=${id || 4}&colorid=${colorId || ''}`)
        const data = await response.data;
        setProduct(data)
    },[colorId,id])
    useEffect(()=>{
        fetchProduct()
    },[fetchProduct]);
  return (
    <article className="le_step-product">
            <div className="le_pr-image-carousel">
                <Swiper
                    spaceBetween={0}
                    slidesPerView={1}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    <SwiperSlide>
                        <div className="le_pr-image">
                            <Image src={product?product.image:pr} width={300} height={300} alt="" />
                        </div>
                    </SwiperSlide>

                </Swiper>
            </div>
            <div className="le_pr-con-wrap">
                <div className="le_pr-content">
                    <h3 className='le_pr-title'>{product?product.product_name:''}</h3>
                    <p className='le_pr-para'>
                    {
                        product?
                        product.attributes?.map((attr,index)=>{
                            return <span key={index}> {attr.value} • </span>
                        }):''
                    }
                    {/* <span>{productData.lensType} • {productData.lensPackage}</span> */}
                    </p>
                    <div className="le_pr-price flex justify-between">
                        <h3>₹{product?product.price:''} {productAddedInCart.lensPackage?`+${productAddedInCart.lensPackage}`:''} <span>+ GST</span></h3>
                        <h3><span>Total : </span>₹{(product?parseInt(product.price) : 0 )+ (productAddedInCart.lensPackage ? parseInt(productAddedInCart.lensPackage) : 0)}</h3>
                    </div>
                </div>
            </div>
        </article>
  )
}

export default StepProduct