'use client'
import React, {useState, useEffect} from 'react'
import Image from 'next/image'
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
import CloseIcon from '@mui/icons-material/Close';

import deleteIcon from '@/images/delete.svg'

const CartItem = ({fullDet}) => {
    const [size, setSize] = useState(null);
    const handleOpen = (value) => setSize(value);
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
        <div className='cart-item flex gap-5'>
            <div className="cart-img">
                {/* <Image src='' alt="" /> */}
            </div>
            <div className="cart-det flex flex-col justify-between items-end w-full">
                <div className='flex items-start justify-between w-full'>
                    <div>
                        <h3>Vincent Chase Online</h3>
                        <p>Size: Medium • Classic Acetate</p>
                        {
                            fullDet &&
                            <>
                                <button className="main-btn link-btn mt-2" onClick={() => handleOpen("sm")}>
                                    <span className='text-sm/[14px]'>View All Details</span>
                                </button>
                            </>
                        }
                    </div>
                    <div>
                        <p className="price">7000</p>
                    </div>
                </div>
                <button className='delete-btn'>
                    <span>Remove</span>
                    <Image src={deleteIcon} alt="" />
                </button>
            </div>

        </div>
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
          <DialogHeader>
            <div className="flex items-center justify-between w-full gap-5 flex-wrap">
                <h2 className='head sm'>Product Name</h2>
                <button className='modal-close-btn' onClick={() => handleOpen("close")}>
                    <CloseIcon />
                </button>
            </div>
          </DialogHeader>
          <DialogBody className='p-8 rounded-xl'>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
              {/* <div className="relative">
                <Image src={LoginImg} width={600} height={600} className='w-full h-full object-cover object-center rounded-xl' />
              </div> */}
              <div className="relative">
                
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <button className="main-btn">
                <span>Apply</span>
            </button>
          </DialogFooter>
        </Dialog>
    </>
  )
}

export default CartItem