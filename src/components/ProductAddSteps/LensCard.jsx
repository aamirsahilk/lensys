'use client'
import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProductAdd } from '@/store/features/productAdd/productAddSlice';
import { updateProductData } from '@/store/features/productAdd/productAddedInCart';

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

const LensCard = ({lensDetails}) => {
    let features = lensDetails.attributes.split('|');
    console.log("dcd 1", features);
    features = features.filter((item)=> item != '');
    console.log("dcd", features, features.length);
    const dispatch = useDispatch();
    const productData = useSelector((state)=> state.productData.value)
    const productAddedInCart = useSelector((state)=> state.productAddedInCart.value)
    const handleCLick = (e)=>{
        const vl = e.target.value;
        const price = e.target.dataset.price;
        dispatch(updateProductAdd({...productData, lensPackage: vl}))
        dispatch(updateProductData({...productAddedInCart, lensPackage: price}))
    }
    const [size, setSize] = useState(null);
    const handleOpen = (value) => {
        setSize(value)
    }
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
        // Check the window width and set the class accordingly
        if (window.innerWidth < 768) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);
  return (
    <>
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
                    {
                        features?
                        <table className='c-table pop-table'>
                            <thead>
                                {
                                    features.map((item,index)=>(
                                        <tr key={index}>
                                            <td>{item}</td>
                                        </tr>
                                    ))
                                }
                            </thead>
                        </table>:''
                    }
                    {/* <br /> */}
                    {/* <button className="text-center mt-2 center mx-auto d-block mt-4 main-btn" onCLick={()=>handleOpen(false)}><span>Close</span></button> */}
                </div>
              </div>
            </DialogBody>
          </Dialog>
        <div className='lens-det-card '>
            <input type="radio" data-price={lensDetails.price} value={lensDetails.id}  onChange={(e)=>handleCLick(e)} id={`n${lensDetails.id}`} name="lensType" defaultChecked={productData.lensPackage && productData.lensPackage == lensDetails.id} />
            <label htmlFor={`n${lensDetails.id}`}>
                <div className="det">
                    <h3 className='title'>{lensDetails.heading}
                    {lensDetails.offer_tag?<><span className={`le_offer-tag moderate`}>{lensDetails.offer_tag}</span></>:''}
                    </h3>
                    <p className='para'>
                        {
                            features.length &&
                            features.map((item,index)=>{
                                if(index < 2){
                                    return (
                                        <div key={index}> 
                                            <span>{item}</span>
                                            {
                                                index < 1?<span>|</span>:''
                                            }
                                        </div>
                                    )
                                }
                            })
                        }
                        {
                            features.length > 2 &&
                            <span className="view-more" onClick={() => handleOpen("sm")}>+{ features.length - 2} More</span>
                        }
                    </p>
                    <p className="price">+ ₹{lensDetails.price}&nbsp; <span>(excluding tax)</span></p>
                </div>
            </label>
        </div>
    </>
  )
}

export default LensCard