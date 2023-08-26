import React, { Fragment, useEffect, useState, useCallback } from 'react'

import { useFormik } from 'formik';
import * as Yup from 'yup';

// icons
import MenIcon from '../icons/MenIcon'
import WomenIcon from '../icons/WomenIcon'
import KidIcon from '../icons/KidIcon'

import halfRim from '@/images/half-rim.svg'
import fullRim from '@/images/full-rim.svg'

import Image from 'next/image'
import api from '@/api/api'

import { usePathname, useSearchParams } from 'next/navigation'


import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Drawer,
  Typography,
  IconButton
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

const FilterArea = ({ handleFilter, categoryParam, filterSearchParam, openDrawerRight, closeDrawerRight,openRight }) => {

  const [filters, setFilters] = useState([]);
  const [initValues, setInitValues] = useState({});
  const [isMobile, setIsMobile] = useState(false)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initValues,
    onSubmit: async (values) => { },
  });

  useEffect(() => {
    setInitValues(filterSearchParam)
  }, [filterSearchParam])

  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  useEffect(() => {
    console.log('param', current.toString(), filterSearchParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchFilters = useCallback(async () => {
    const res = await api.get('filters/' + categoryParam);
    const data = res.data;
    if (data) {
      setFilters(data)
    }
  }, [categoryParam])


  useEffect(() => {
    fetchFilters();
  }, [fetchFilters])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    closeDrawerRight();
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [closeDrawerRight]);

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

  const handleReadmore = (e) => {
    var all = e.target.parentElement.querySelectorAll('.hidden');
    all.forEach(function (e) {
      e.classList.remove('hidden')
    });
    e.target.classList.add('hidden')
  }

  const maxLength = 10;

  const handleClearAll = (e) => {
    formik.resetForm();
    handleFilter();
  }

  if(!isMobile){
    return(
    <aside className='filter-side-bar'>
      <div className="filter-head">
        <h3>Filter</h3>
        <button onClick={handleClearAll}>Clear All</button>
      </div>
      <div className="filter-body">
        <div className="filter-card">
          <form action="">
            <Accordion className='cus-acc' open={openAcc1} icon={<Icon  open={openAcc1} />}>
              <AccordionHeader onClick={handleOpenAcc1}>
                <h4>SHOP FOR</h4>
              </AccordionHeader>
              <AccordionBody>
                <div className="im-cus-radio-container">
                  <div className="im-cus-radio">
                    <input
                    type="radio"
                    name='subcategory'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value="MEN"
                    onClick={(e)=>{
                      formik.handleChange(e);
                      handleFilter(e)
                    }}
                    id="men"
                    checked={formik.values.subcategory === 'MEN'} />
                    <label htmlFor="men">
                      <div className="ic">
                        <MenIcon />
                      </div>
                      <p>MEN</p>
                    </label>
                  </div>
                  <div className="im-cus-radio">
                  <input
                    type="radio"
                    name='subcategory'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value="WOMEN"
                    onClick={(e)=>{
                      formik.handleChange(e);
                      handleFilter(e)
                    }}
                    id="women"
                    checked={formik.values.subcategory === 'WOMEN'} />
                    <label htmlFor="women">
                      <div className="ic">
                        <WomenIcon />
                      </div>
                      <p>WOMEN</p>
                    </label>
                  </div>
                  <div className="im-cus-radio">
                  <input
                    type="radio"
                    name='subcategory'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value="KIDS"
                    onClick={(e)=>{
                      formik.handleChange(e);
                      handleFilter(e)
                    }}
                    id="kids" 
                    checked={formik.values.subcategory === 'KIDS'}/>
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
            {
              filters.priceranges && filters.priceranges.length > 0 &&
              <Accordion className='cus-acc' open={openAcc2} icon={<Icon open={openAcc2} />}>
                <AccordionHeader onClick={handleOpenAcc2}>
                  <h4>PRICES</h4>
                </AccordionHeader>
                <AccordionBody>
                  <div className="checkbox-container">
                    {
                      filters.priceranges.length > 0 &&
                      filters.priceranges.map((mp, index) => {
                        return (
                          <div className="cus-checkbox-wrapper" key={index}>
                            <input
                            type="radio"
                            name='pricerange'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={mp.min+'-'+mp.max}
                            onClick={(e)=>{
                              formik.handleChange(e);
                              handleFilter(e)
                            }}
                            id={`price-${index}`}
                            checked={formik.values.pricerange === mp.min+'-'+mp.max} />
                            <input type="radio" value={mp.min+'-'+mp.max} name='pricerange' onClick={(e)=>handleFilter(e)} id={`price-${index}`} />
                            <label htmlFor={`price-${index}`}>
                              <span>{mp.min+'-'+mp.max}</span>
                            </label>
                          </div>
                        )
                      })
                    }
                  </div>
                </AccordionBody>
              </Accordion>
            }
            {
              filters.brands && filters.brands.length > 0 &&
              <Accordion className='cus-acc' open={openAcc2} icon={<Icon open={openAcc2} />}>
                <AccordionHeader onClick={handleOpenAcc2}>
                  <h4>BRANDS</h4>
                </AccordionHeader>
                <AccordionBody>
                  <div className="checkbox-container">
                    {
                      filters.brands.length > 0 &&
                      filters.brands.map((mp, index) => {
                          return (
                              <div className={`cus-checkbox-wrapper ${index+1 > maxLength?"hidden":''}`} key={index}>
                                <input type="radio" value={mp.id} onClick={(e)=>handleFilter(e)} name='brands' id={`brand-${index}`} />
                                <label htmlFor={`brand-${index}`}>
                                  <span>{mp.name}</span>
                                </label>
                              </div>
                          )
                      })
                    }
                    {
                      filters.brands &&
                      filters?.brands.length > maxLength?<button type="button" className='main-btn link-btn mt-2' onClick={(e)=>handleReadmore(e)}><span>+{filters?.brands.length - maxLength} More</span></button>:''
                    }
                  </div>
                </AccordionBody>
              </Accordion>
            }
          </form>
        </div>
      </div>
    </aside>
    )
  }else{
    return (
      <Drawer
        placement="right"
        open={openRight}
        onClose={closeDrawerRight}
        className="p-4"
        size={450}
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Apply Coupon
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={closeDrawerRight}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
  
  
  
      </Drawer>
    )
  }

}

export default FilterArea