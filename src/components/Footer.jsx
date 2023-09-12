import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import logo from '../images/logo.png'
import NewsLetter from './NewsLetter'
import api from '@/api/api'
import { useState, useEffect } from 'react'

import instagram from '../../public/images/instagram.png'
import facebook from '../../public/images/facebook.png'
import twitter from '../../public/images/twitter.png'
import linkedin from '../../public/images/linkedin.png'

const Footer = () => {
    const [categories, setCatagories] = useState([])
    const fetchCategories = async() =>{
        const response = await api.get('categories');
        setCatagories(response.data)
    }

    useEffect(() =>{
        fetchCategories();
    },[])
  return (
    <footer className="main-footer">
        <div className="container mx-auto">
            <div className="grid lg:grid-cols-6 grid-cols-1 gap-8">
                <div className="relative lg:col-span-3">
                    <Link href="" className='ft-logo'>
                        <Image src={logo} alt="" />
                    </Link>
                    <div className="ft-content">
                        <h3 className='ft-head'>Buy The Best Eyewear From Lensys</h3>
                        <p className="para">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </p>
                    </div>
                    {/* <h3 className="ft-head">
                        Subscribe to our newsletter
                    </h3>
                    <NewsLetter /> */}
                </div>
                {/* <div className="relative">
                    <h3 className="ft-head">
                        Quick Links
                    </h3>
                    <ul className="ft-list">
                        <li>
                            <Link href="">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link href="">
                                Career
                            </Link>
                        </li>
                        <li>
                            <Link href="">
                                Store Locator
                            </Link>
                        </li>
                        <li>
                            <Link href="">
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </div> */}
                <div className="relative">
                <h3 className="ft-head">
                        Categories
                    </h3>
                    <ul className="ft-list">
                        {   
                            categories.length > 0 &&
                            categories?.map((cat,index)=>(
                                <li className='' key={index}>
                                    <Link href={'products/'+cat.id}>
                                        <span>{cat.name}</span>
                                    </Link>
                           
                                </li>
                            ))
                        }
                      
                    </ul>
                </div>
                <div className="relative lg:col-span-2">
                <h3 className="ft-head">
                        Contact Details
                    </h3>
                    <ul className="con-list ft-list">
                        <li>
                            <span>Phone</span>
                            <a href="tel:917470560626">
                                +91 7470560626
                            </a>
                        </li>
                        <li>
                            <span>Mail</span>
                            <a href="mailto:support@lensys.in">
                                support@lensys.in
                            </a>
                        </li>
                        <li>
                            <span>Location</span>
                            <a href="mailto:support@lensys.in">
                                309, 2/A New Uday nagar <br/> 
                                navi mumbai, maharashtra, India
                            </a>
                        </li>
                        
                    </ul>
                    <ul className='soc-list'>
                        <li>
                            <Link href={'Facebook.com'}>
                                <Image width={37} height={37} src={facebook} alt="" />
                            </Link>
                        </li>
                        <li>
                            <Link href={'Facebook.com'}>
                                <Image width={37} height={37} src={instagram} alt="" />
                            </Link>
                        </li>
                        <li>
                            <Link href={'Facebook.com'}>
                                <Image width={37} height={37} src={twitter} alt="" />
                            </Link>
                        </li>
                        <li>
                            <Link href={'Facebook.com'}>
                                <Image width={37} height={37} src={linkedin} alt="" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="ft-bottom">
            <div className="container mx-auto">
                <p className="para text-center">
                    Copyright 2023 | Lensys Pvt. Ltd | <Link href="https://techmatrick.com" passHref={true} target="_blank">Code & Design Credits</Link>
                </p>
            </div>
        </div>
    </footer>
  )
}

export default Footer