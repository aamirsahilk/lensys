"use client"
import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';

import FirstStep from '@/components/ProductAddSteps/FirstStep';
import SecondStep from '@/components/ProductAddSteps/SecondStep';
import ThirdStep from '@/components/ProductAddSteps/ThirdStep';
import api from '@/api/api';

import { useSelector } from 'react-redux';
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

import LoginSigup from '@/components/LoginSigup';

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];



export default function AddProductSteps({params, searchParams}) {
  const {pid,color} = searchParams;
  const [activeStep, setActiveStep] = useState(0);
  const [addtocartbtn, setAddtocartbtn] = useState(false);
  const [domLoaded, setDomLoaded] = useState(false)

  const [isMobile, setIsMobile] = useState(false);
  const [size, setSize] = useState(null);
  const handleOpen = (value) => setSize(value)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  // const [productData, setProductData] = useState({});

  const productData = useSelector((state)=> state.productData.value );
  const userdata = useSelector((state)=> state.userData.value );

  const handleNext = () => {
    if(activeStep < steps.length - 1){
      if(activeStep == 0 && productData.lensType || activeStep == 1 && productData.lensPackage){
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }else{
      if(userdata.loggedin){
        setAddtocartbtn(true)
        addToCart();
      }else{
        // addToCart();
        // setAddtocartbtn(true)
        setSize(isMobile? 'xl': size || "md");
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const changeStep = (vl) => {
    switch (vl) {
      case 0:
        return (
          <FirstStep id={pid} colorId={color}  />
        )
        break;

      case 1:
        return (
          <SecondStep id={pid} colorId={color}  />
        )
        break;

      case 2:
        return (
          <ThirdStep id={pid} colorId={color} />
        )
        break;

      default:
        break;
    }
  }
  useEffect(() => {
    setDomLoaded(true)
  },[])
  useEffect(() => {
    console.log('con', activeStep, productData?.hasError, productData?.prescription);
    if(productData?.hasError && activeStep == 2 && productData?.prescription != 1 ){
        setAddtocartbtn(true)
      }else{
        setAddtocartbtn(false)
    }
  },[productData,activeStep])

  // const accessToken = localStorage.getItem('access_token');
  const { push } = useRouter();

  const addToCart = async () => {
    // return
    var formData = new FormData();
    Object.keys(productData).forEach((key) => {
        formData.append(key, productData[key]);
    });
    formData.append('colorid', color);
    formData.append('productid', pid);
    const res = await api.post(`addtocart?auth=${userdata.access_token}`, formData);
    const data = res.data;
    setAddtocartbtn(false)
    if(data.status){
      push('/cart');
    }
  }
  

  return (
    <main>

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
            
            <DialogBody className='p-8 rounded-xl'>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                
                <div className="relative">
                  <LoginSigup handleOpen={handleOpen} />
                </div>
              </div>
            </DialogBody>
          </Dialog>

          {activeStep === steps.length ? (
            <React.Fragment>
              <div>
                <h1>All Completed</h1>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {
                changeStep(activeStep)
              }
              <div className="step-bt-bar">
                <button className="main-btn big secondary" disabled={activeStep === 0} onClick={handleBack}>
                  <span>Back</span>
                </button>
                <button className="main-btn big dark" onClick={handleNext} disabled={addtocartbtn}>
                  <span>{activeStep === steps.length - 1 ? 'Add To Cart' : 'Continue'}</span>
                </button>
              </div>
            
            </React.Fragment>
          )}

    </main>
  );
}