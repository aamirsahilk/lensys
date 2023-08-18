import React, { Fragment, useEffect, useState, useCallback } from 'react'

// icons
import MenIcon from '../icons/MenIcon'
import WomenIcon from '../icons/WomenIcon'
import KidIcon from '../icons/KidIcon'

import halfRim from '@/images/half-rim.svg'
import fullRim from '@/images/full-rim.svg'

import Image from 'next/image'
import api from '@/api/api'


import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${id === open ? "rotate-180" : ""
        } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

const FilterArea = () => {

  const [filters, setFilters] = useState([]);

  const fetchFilters = useCallback(async() =>{
    const res = await api.get('filters/eyeglasses');
    const data = res.data;
    console.log('filters', data);
    if(data){
      setFilters(data)
    }
  },[])


  useEffect(()=>{
    fetchFilters();
  }, [fetchFilters])

  const [openAcc1, setOpenAcc1] = useState(true);
  const [openAcc2, setOpenAcc2] = useState(true);
  const [openAcc3, setOpenAcc3] = useState(true);
  const [openAcc4, setOpenAcc4] = useState(true);
  const [openAcc5, setOpenAcc5] = useState(true);
 
  const handleOpenAcc1 = () => setOpenAcc1(cur => !cur);
  const handleOpenAcc2 = () => setOpenAcc2(cur => !cur);
  const handleOpenAcc3 = () => setOpenAcc3(cur => !cur);
  const handleOpenAcc4 = () => setOpenAcc4(cur => !cur);
  const handleOpenAcc5 = () => setOpenAcc5(cur => !cur);

  const PricesFilter = [
    "₹0 - 1000",
    "₹1000 - 1500",
    "₹1500 - 2000",
    "₹2000 - 2500",
    "₹2500 - 5000",
    "₹5000 - 10000"
  ]

  const brands = [
    "Acetate",
    "Combination",
    "Metal",
    "Metallic",
    "Nylon",
    "Plastic"
  ]

  const handleReadmore = (e)=>{
    var all = e.target.parentElement.querySelectorAll('.hidden');
    all.forEach(function(e){
      e.classList.remove('hidden')
    });
    e.target.classList.add('hidden')
  }

  const maxLength = 2;


  return (
    <aside className='filter-side-bar'>
      <div className="filter-head">
        <h3>Filter</h3>
        <button>Clear All</button>
      </div>
      <div className="filter-body">
        <div className="filter-card">
          <Accordion className='cus-acc' open={openAcc1} icon={<Icon  open={openAcc1} />}>
            <AccordionHeader onClick={handleOpenAcc1}>
              <h4>SHOP FOR</h4>
            </AccordionHeader>
            <AccordionBody>
              <div className="im-cus-radio-container">
                <div className="im-cus-radio">
                  <input type="radio" name="shopfor" id="men" />
                  <label htmlFor="men">
                    <div className="ic">
                      <MenIcon />
                    </div>
                    <p>MEN</p>
                  </label>
                </div>
                <div className="im-cus-radio">
                  <input type="radio" name="shopfor" id="women" />
                  <label htmlFor="women">
                    <div className="ic">
                      <WomenIcon />
                    </div>
                    <p>WOMEN</p>
                  </label>
                </div>
                <div className="im-cus-radio">
                  <input type="radio" name="shopfor" id="kids" />
                  <label htmlFor="kids">
                    <div className="ic">
                      <KidIcon />
                    </div>
                    <p>KIDS</p>
                  </label>
                </div>
              </div>
            </AccordionBody>
          </Accordion>
          <Accordion className='cus-acc' open={openAcc2} icon={<Icon open={openAcc2} />}>
            <AccordionHeader onClick={handleOpenAcc2}>
              <h4>PRICES</h4>
            </AccordionHeader>
            <AccordionBody>
              <div className="checkbox-container">
                {
                  PricesFilter.map((mp, index) => {
                    return (
                      <div className="cus-checkbox-wrapper" key={index}>
                        <input type="radio" name='pricesFilter' id={`price-${index}`} />
                        <label htmlFor={`price-${index}`}>
                          <span>{mp}</span>
                        </label>
                      </div>
                    )
                  })
                }
              </div>
            </AccordionBody>
          </Accordion>
          {/* <Accordion className='cus-acc' open={openAcc3} icon={<Icon open={openAcc3} />}>
            <AccordionHeader onClick={handleOpenAcc3}>
              <h4>STYLES</h4>
            </AccordionHeader>
            <AccordionBody>
              <div className="im-cus-radio-container">
                <div className="im-cus-radio">
                  <input type="radio" name="shopfor" id="full" />
                  <label htmlFor="full">
                    <div className="ic mb-0">
                      <Image src={fullRim} alt="" width={35} height={35} />
                    </div>
                    <p>Full<br /> Frame</p>
                  </label>
                </div>
                <div className="im-cus-radio">
                  <input type="radio" name="shopfor" id="half" />
                  <label htmlFor="half">
                    <div className="ic mb-0">
                      <Image src={halfRim} alt="" width={35} height={35} />
                    </div>
                    <p>Half<br /> Frame</p>
                  </label>
                </div>
                <div className="im-cus-radio">
                  <input type="radio" name="shopfor" id="rimless" />
                  <label htmlFor="rimless">
                    <div className="ic mb-0">
                      <Image src={halfRim} alt="" width={35} height={35} />
                    </div>
                    <p>Rimless Frame</p>
                  </label>
                </div>
              </div>
            </AccordionBody>
          </Accordion> */}
          {
            filters &&
            <Accordion className='cus-acc' open={openAcc2} icon={<Icon open={openAcc2} />}>
              <AccordionHeader onClick={handleOpenAcc2}>
                <h4>BRANDS</h4>
              </AccordionHeader>
              <AccordionBody>
                <div className="checkbox-container">
                  {
                    filters.brands &&
                    filters.brands.map((mp, index) => {
                        return (
                            <div className={`cus-checkbox-wrapper ${index+1 > maxLength?"hidden":''}`} key={index}>
                              <input type="radio" value={mp.id} name='brandFilter' id={`brand-${index}`} />
                              <label htmlFor={`brand-${index}`}>
                                <span>{mp.name}</span>
                              </label>
                            </div>
                        )
                    })
                  }
                  {
                    filters.brands &&
                    filters?.brands.length > maxLength?<button className='main-btn link-btn mt-2' onClick={(e)=>handleReadmore(e)}><span>+{filters?.brands.length - maxLength} More</span></button>:''
                  }
                </div>
              </AccordionBody>
            </Accordion>
          }
        </div>
      </div>
    </aside>
  )
}

export default FilterArea