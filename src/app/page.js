'use client'
import Image from 'next/image'
import HomeBannerArea from '@/components/HomeBannerArea'
import HomeCatPr from '@/components/HomeCatPr'
import OfferGridArea from '@/components/OfferGridArea'
import HomeBrands from '@/components/HomeBrands'
import SecHeading from '@/components/SecHeading'
import CustomButton from '@/components/CustomButton'
import ProductImageSlider from '@/components/ProductImageSlider'
import TestimonialsSec from '@/components/TestimonialsSec'
import { toast, ToastContainer } from "react-toastify";
import { ThemeProvider } from "@material-tailwind/react";
import HomeCatSlider from '@/components/HomeCatSlider'
import Link from 'next/link'


export default function Home() {
  
  return (
    <ThemeProvider>
      
      <HomeBannerArea />
      <HomeCatSlider /> 
      <HomeCatPr />
      <OfferGridArea />
      <HomeBrands />
      <section className='home_pr-slider-sec sec'>
        <div className='container mx-auto'>
          <div className='relative'>
            <SecHeading centerLine={true}>
                Corrective Contact lenses
            </SecHeading>
            <ProductImageSlider lenstype={'corrective-contact-lens'} />
          </div>
        </div>
      </section>
      <section className='home_pr-slider-sec sec'>
        <div className='container mx-auto'>
          <div className='relative'>
            <SecHeading centerLine={true}>
                Color Contact lenses
            </SecHeading>
            <ProductImageSlider lenstype={'color-contact-lens'} />
          </div>
        </div>
      </section>
      {/* <TestimonialsSec /> */}
    </ThemeProvider>
  )
}
