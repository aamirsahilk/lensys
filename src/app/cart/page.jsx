'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import offerImage from '@/images/offer.svg'
import infoIcon from '@/images/info.svg'


import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import CartItem from '@/components/CartItem'

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

const Cart = () => {
    const [open, setOpen] = useState(true);
    const [isAddressSame, setIsAddressSame] = useState(false)
    
    const handleOpen = () => setOpen((prevState)=> !prevState);

    return (
        <main className='cart-page pt-8 pb-8'>
            
            <div className="container mx-auto">
            
                <div className="apply-offer-strip">
                    <div className="ic">
                        <Image src={offerImage} width={30} height={30} alt="" />
                    </div>
                    <input type="text" placeholder='Apply Coupon' />
                    <a href="javascript:void(0)" className="main-btn">
                        Apply Coupon
                    </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 mt-8 gap-8">
                    <div className="relative md:col-span-7">
                        <h3 className="it-head mb-5">
                            Personal Details
                        </h3>
                        <div className="info-line flex no-wrap gap-2">
                            <Image src={infoIcon} alt="" width={25} height={25} />
                            <span>Lorem Ipsum is simply dummy text of the</span>
                        </div>
                        <div className="grid mt-8 mb-8 grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="form-group">
                                <div className="inp-grp">
                                    <input type="text" placeholder='First Name' />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="inp-grp">
                                    <input type="text" placeholder='last Name' />
                                </div>
                            </div>
                            <div className="form-group col-span-2">
                                <div className="inp-grp">
                                    <input type="text" placeholder='Phone Number' />
                                </div>
                            </div>
                            <div className="form-group col-span-2">
                                <div className="inp-grp">
                                    <input type="text" placeholder='Alternate Phone Number' />
                                </div>
                            </div>
                            <div className="form-group col-span-2">
                                <div className="inp-grp">
                                    <input type="text" placeholder='E-mail' />
                                </div>
                            </div>
                        </div>
                        <div className="info-line flex no-wrap items-start gap-2">
                            <Image src={infoIcon} alt="" width={25} height={25} />
                            <span>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys
                            </span>
                        </div>
                        <h3 className="it-head mb-5 mt-10">
                            Billing Address
                        </h3>
                        <div className="grid mt-8 mb-8 grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="form-group col-span-2">
                                <div className="inp-grp">
                                    <input type="text" placeholder='Address Line 1' />
                                </div>
                            </div>
                            <div className="form-group col-span-2">
                                <div className="inp-grp">
                                    <input type="text" placeholder='Address Line 2' />
                                </div>
                            </div>
                            <div className="form-group ">
                                <div className="inp-grp">
                                    <input type="text" placeholder='State' />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="inp-grp">
                                    <input type="text" placeholder='City' />
                                </div>
                            </div>
                            <div className="form-group col-span-2">
                                <div className="inp-grp">
                                    <input type="text" placeholder='Zip Code' />
                                </div>
                            </div>
                        </div>
                        <h3 className="it-head mb-5 mt-10">
                            Delivery Address
                        </h3>
                        <div className="cus-checkbox-wrapper" >
                            <input type="checkbox" name='deliveryAddress' defaultChecked id={`price-1`} />
                            <label htmlFor={`price-1`}>
                                <span>Delivery Address same as billing address</span>
                            </label>
                        </div>
                        {
                            isAddressSame ? <div className="grid mt-8 mb-8 grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="form-group col-span-2">
                                    <div className="inp-grp">
                                        <input type="text" placeholder='Address Line 1' />
                                    </div>
                                </div>
                                <div className="form-group col-span-2">
                                    <div className="inp-grp">
                                        <input type="text" placeholder='Address Line 2' />
                                    </div>
                                </div>
                                <div className="form-group ">
                                    <div className="inp-grp">
                                        <input type="text" placeholder='State' />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="inp-grp">
                                        <input type="text" placeholder='City' />
                                    </div>
                                </div>
                                <div className="form-group col-span-2">
                                    <div className="inp-grp">
                                        <input type="text" placeholder='Zip Code' />
                                    </div>
                                </div>
                            </div> : ''
                        }

                    </div>
                    <div className="relative md:col-span-5 sticky top-20 self-start">
                        <Accordion open={open} icon={<Icon id={1} open={open?1:0} />}>
                            <AccordionHeader className='cart-total-btn' onClick={handleOpen}>
                                <h3 className="it-head">
                                    Total: <span>13,000</span>
                                </h3>
                            </AccordionHeader>
                            <AccordionBody>
                                <div className="cart-items-list">
                                    <CartItem />
                                </div>
                            </AccordionBody>
                        </Accordion>
                        <button className='main-btn full mt-5 big dark'>
                            <span>Proceed For Payment</span>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Cart