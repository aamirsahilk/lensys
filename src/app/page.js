'use client'
import Image from 'next/image'
import HomeBannerArea from '../components/HomeBannerArea'
import HomeCatSlider from '../components/HomeCatSlider'
import HomeCatPr from '../components/HomeCatPr'
import OfferGridArea from '../components/OfferGridArea'
import HomeBrands from '../components/HomeBrands'
import SecHeading from '../components/SecHeading'
import CustomButton from '../components/CustomButton'
import ProductImageSlider from '../components/ProductImageSlider'
import TestimonialsSec from '../components/TestimonialsSec'
import { toast, ToastContainer } from "react-toastify";
import { ThemeProvider } from "@material-tailwind/react";


export default function Home() {
  const clicked = ()=>{
      toast('Toast is good', { hideProgressBar: false, autoClose: 2000, type: 'success' })
  }
  return (
    <ThemeProvider>
      <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      <HomeBannerArea />
      <HomeCatSlider /> 
      <HomeCatPr />
      <OfferGridArea />
      <HomeBrands />
      <section className='home_pr-slider-sec sec'>
        <div className='container mx-auto'>
          <div className='relative'>
            <SecHeading centerLine={true}>
                Contact lenses
            </SecHeading>
            <ProductImageSlider />
            <CustomButton arrow={true} center={true} cusclassName={'mt-14'}>
              View All
            </CustomButton>
          </div>
        </div>
      </section>
      <TestimonialsSec />
    </ThemeProvider>
  )
}
