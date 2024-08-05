'use client'
import React, {useState, useEffect, useRef} from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';

import "swiper/css";
import "swiper/css/navigation";
import SwiperCore, { Navigation } from 'swiper/core';
import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Avatar,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";

SwiperCore.use([Navigation]);

const ProductInnerMainSlider = ({thumbs, mainImage}) => {
    const navigationPrevRef = useRef();
    const navigationNextRef = useRef();
    const [image, setImage] = useState(mainImage);
    const [domLoaded, setDomLoaded] = useState(false);
    const [size, setSize] = useState(null);
    const handleOpen = (value) => setSize(value)
    useEffect(()=>{
        setImage(mainImage)
    },[mainImage])
    const handleThumbnailClick = (im) => {
        setImage(im)
    }

    const [zoomedPreview, setZoomedPreview] = useState(null);

    const handleMouseMove = (e) => {
      const { left, top, width, height } = e.target.getBoundingClientRect();
      const x = (e.pageX - left) / width * 100;
      const y = (e.pageY - top) / height * 100;
      setZoomedPreview({ x, y });
    };
  
    const handleMouseLeave = () => {
      setZoomedPreview(null);
    };

    useEffect(() => {
        // Hack: Swiper doesn't initialize navigation properly if the refs are set initially to null.
        if (navigationPrevRef.current && navigationNextRef.current) {
            const swiper = document.querySelector('.thumb-slider').swiper;
            swiper.params.navigation.prevEl = navigationPrevRef.current;
            swiper.params.navigation.nextEl = navigationNextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
        }
    }, [navigationPrevRef, navigationNextRef]);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
        if (window.innerWidth < 768) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
        };
        handleResize();
        setDomLoaded(true)
        window.addEventListener('resize', handleResize);
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);
  return (
    <div className='grid grid-cols-1 md:grid-cols-6 gap-2 le_pr-inner-main-slider'>
        <div className="relative row-start-2 row-end-3 md:row-start-1 md:row-end-1">
            <div className="thumb-s-w">
                <Swiper
                direction={isMobile?'horizontal':"vertical"}
                onSlideChange={() => {}}
                onSwiper={(swiper) => {}}
                className='thumb-slider '
                allowMouseEvents
                navigation={{ prevEl: navigationPrevRef.current, nextEl: navigationNextRef.current, }}
                breakpoints={{
                    0: {
                        slidesPerView: 3.5,
                        spaceBetween: 10,
                    },
                    640: {
                        slidesPerView: 3.5,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 10,
                    },
                }}
                >
                    {
                        mainImage &&
                        <SwiperSlide >
                            <div className={`le_pr-inner-image-block ${image == mainImage && 'active'}`} onClick={(e)=>handleThumbnailClick(mainImage)} >
                                <Image src={mainImage} alt={''} width={100} height={100} />
                            </div>
                        </SwiperSlide>
                    }
                    {
                        thumbs?.map((item, index)=>{
                            return (
                                <SwiperSlide key={index}>
                                    <div className={`le_pr-inner-image-block ${image == item.image && 'active'}`} onClick={(e)=>handleThumbnailClick(item.image)} >
                                        <Image src={item.image} alt={item.alt_text} width={100} height={100} />
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }
            
                </Swiper>
                <div className="sw-next" ref={navigationNextRef} />
                <div className="sw-prev" ref={navigationPrevRef} />
            </div>

            
        </div>
        <div className="relative col-span-5 row-start-1 row-end-2 md:row-start-1 md:row-end-1">
            <div className="main-image-show">
            <Dialog
            open={
              size === "xs" ||
              size === "sm" ||
              size === "md" ||
              size === "lg" ||
              size === "xl" ||
              size === "xxl"
            }
            size={isMobile? 'xl': size || "md"}
            handler={handleOpen}
           
          >
            
            <DialogBody className='p-0 rounded-xl  overflow-scroll' style={{'background':'#e7f6fc'}}>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                <div className="relative">
                    <button className='modal-cl-btn' onClick={() => handleOpen("none")}>&times;</button>
                  <Image src="/images/size-guide.jpg" alt="" width={550} height={550} />
                </div>
              </div>
            </DialogBody>
          </Dialog>
                <span className='size-g-btn' onClick={() => handleOpen("sm")}>
                    <span>Size Guide</span>
                </span>
                {
                    image? 
                    <Image onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} src={image} alt="" width={500} height={500} />:''
                }
                {(zoomedPreview && domLoaded) &&  (
                    <div
                    className="zoom-preview"
                    style={{
                        backgroundImage: `url(${image})`,
                        backgroundPosition: `${zoomedPreview.x}% ${zoomedPreview.y}%`,
                    }}
                    />
                )}
            </div>
        </div>
    </div>
  )
}

export default ProductInnerMainSlider