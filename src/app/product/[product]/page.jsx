'use client'
import React, {useState, useEffect} from 'react'
import ProductInnerMainSlider from '../../components/ProductInnerMainSlider'
import SecHeading from '../../components/SecHeading'
import CheckPincode from '../../components/CheckPincode'
import CustomButton from '../../components/CustomButton'
import ProductInnerTabs from '../../components/ProductInnerTabs'
import Link from 'next/link'
import Image from 'next/image'
import offerImage from '../../../images/offer-banner.jpg'
import ProductCard from '../../components/ProductCard'

const ProductInner = ({params}) => {
  const [color, setColor] = useState('Japanese Gold')
  const colors = [
    {
      name : 'Japanese Gold',
      hex : '#EDA587'
    },
    {
      name : 'Brown',
      hex : '#A3651F'
    },
    {
      name : 'Silver',
      hex : '#C4BEC4'
    },
    {
      name : 'Blue',
      hex : '#3048B3'
    },
  ]
  return (
    <main className='le_product-inner-page'>
      {`dcdd- ${params.product}`}
        <div className="container mx-auto">
          <section className="sec">
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-14">
              <div className="relative">
                <ProductInnerMainSlider />
              </div>
              <div className="relative">
                <SecHeading>
                  Spectus
                </SecHeading>
                <p className="para mt-5">
                  AMIN-Titanium <br />
                  Hexagon Glasses in Titanium
                </p>
                <div className="price-wrapper mt-5">
                  <p>₹ 1600.00 <span>( inc VAT )</span></p>
                </div>
                <div className="act-msg suc">
                  <p>Delivered in 6-7 operational days</p>
                </div>
                <div className="color-selector-wrapper mt-5">
                    <p className="para dark">
                      Color <span>{color}</span>
                    </p>
                    <div className="flex flex-wrap gap-5 mt-5">
                      {
                        colors.map((col, index)=>{
                          return(
                            <div className='color-selector'>
                              <input type="radio" defaultChecked={col.name === "Japanese Gold"} value={col.name} name="color" onChange={ev=>setColor(ev.target.value)} id={`color-${index}`} />
                              <label htmlFor={`color-${index}`}>
                                <span className='color' style={{background: col.hex}}></span>
                                <p>{col.name}</p>
                              </label>
                            </div>
                          )
                        })
                      }
                    </div>
                </div>
                <CheckPincode />
                <div className="flex flex-wrap gap-2 mt-8">
                  <CustomButton secondary={true} big={true}>ONLY FRAME</CustomButton>
                  <CustomButton big={true} headerBtn={true}>SELECT LENSE</CustomButton>
                </div>
                <div className="relative mt-5">
                  <ul className="pointer-list">
                    <li>
                      Includes High-Quality Standard Lenses
                    </li>
                    <li>
                      30-Day Money Back Guarantee
                    </li>
                    <li>
                      Thin and light lenses as per your prescription
                    </li>
                  </ul>
                </div>
                
              </div>
            </div>
          </section>
        </div>
        <div className="seprator"></div>
        <section className="sec pr-tab-sec">
            <div className="container mx-auto">
              <div className="relative">
                  <ProductInnerTabs />
              </div>
            </div>
        </section>
        <div className="seprator"></div>
        <Link href="" className="le_offer-link-banner">
          <Image src={offerImage} alt="offer" className='w-full'/>
        </Link>
        <div className="seprator"></div>
        <section className="sec pr-inner-pr-grid-sec">
          <div className="container mx-auto">
            <SecHeading centerLine={true}>
              <span>Find</span> The Perfect Fit
            </SecHeading>
            <div className="relative mt-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                <div className="relative">
                  <ProductCard />
                </div>
                <div className="relative">
                  <ProductCard />
                </div>
                <div className="relative">
                  <ProductCard />
                </div>
                <div className="relative">
                  <ProductCard />
                </div>
                <div className="relative">
                  <ProductCard />
                </div>
                <div className="relative">
                  <ProductCard />
                </div>
                <div className="relative">
                  <ProductCard />
                </div>
                <div className="relative">
                  <ProductCard />
                </div>
            </div>
          </div>
        </section>
    </main>
  )
}

export default ProductInner