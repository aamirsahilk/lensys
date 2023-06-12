import React, {useState, useEffect} from 'react'
import Productlikebtn from './Productlikebtn'
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

import 'swiper/css';

const ProductCard = ({ data, ImageProductCard}) => {
    const [liked , setLiked] = useState(false);
    const hasOffer = true;
    return (
        <article className={`le_pr-main-wrapper ${ImageProductCard?'le_pr-main-img-wrapper':''}`}>
            <Productlikebtn liked={liked} setLiked={setLiked} />
            <div className="le_pr-image-carousel">
                <Swiper
                    spaceBetween={0}
                    slidesPerView={1}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    <SwiperSlide>
                        <div className="le_pr-image">
                            <Image src="" width={300} height={300} alt="" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="le_pr-image">
                            <Image src="" width={300} height={300} alt="" />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className="le_pr-content">
                <h3 className='le_pr-title'>Vincent Chase Online</h3>
                <p className='le_pr-para'>Size: Medium • Classic Acetate</p>
                <div className="le_pr-price">
                    <h3>₹999 <span>+ tax</span></h3>
                </div>
            </div>
            <div className="le_pr-offer-strip">
                BUY 1 GET 1 FREE
            </div>
        </article>
    )
}

export default ProductCard