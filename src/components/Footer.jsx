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

    const currentYear = new Date().getFullYear();

    useEffect(() =>{
        fetchCategories();
    },[])
  return (
    <footer className="main-footer">
        <div className="container mx-auto">
            <div className="grid lg:grid-cols-6 grid-cols-1 gap-8">
                <div className="relative lg:col-span-2">
                    <Link href="" className='ft-logo'>
                        <Image src={logo} alt="" />
                    </Link>
                    <div className="ft-content">
                        <h3 className='ft-head'>Refining Eyewear Trends</h3>
                        <p className="para">
                        Your go-to experts for eyewear solutions. We specialize in creating eyewear with innovative designs and exceptional quality to bring you the ideal pair of glasses. Seeking style, comfort, or functionality? Lensys Eyewear has got you covered.
                            {/* Whether you&apos;re in search of fashionable frames, precision lenses, or cutting-edge optical accessories, we&apos;ve got you covered. Our commitment to exceptional craftsmanship and customer satisfaction sets us apart.  */}
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
                <div className="relative">
                    <h3 className="ft-head">
                        Other Links
                    </h3>
                    <ul className="ft-list">
                        <li>
                            <Link href={'/blogs'}>
                                <span>Blogs</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/privacy-policy'}>
                                <span>Privacy Policy</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/terms-and-conditions'}>
                                <span>Terms & Conditions</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/refund-policy'}>
                                <span>Refund Policy</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/disclaimer'}>
                                <span>Disclaimer</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="relative lg:col-span-2">
                <h3 className="ft-head">
                        Contact Details
                    </h3>
                    <ul className="con-list ft-list">
                        {/* <li>
                            <span>Phone</span>
                            <a href="tel:917470560626">
                                +91 7470560626
                            </a>
                        </li> */}
                        <li>
                            <span>Mail</span>
                            <a href="mailto:support@lensys.in">
                                support@lensys.in
                            </a>
                        </li>
                        <li>
                            <span>Location</span>
                            <a href="mailto:support@lensys.in">
                                1st Floor, D9, Parle Colony CHS, <br />
                                Sahakar Marg, Near Garware House, <br />
                                Vile Parle East, Mumbai 400057.
                                
                            </a>
                        </li>
                        
                    </ul>
                    <ul className='soc-list'>
                        <li>
                            <Link href={'https://www.facebook.com/lensys.in?mibextid=LQQJ4d'} target="_blank">
                                <Image width={37} height={37} src={facebook} alt="" />
                            </Link>
                        </li>
                        <li>
                            <Link href={'https://www.instagram.com/lensys.in?igsh=d2J4N3pzeDl5N2tt&utm_source=qr'} target="_blank">
                                <Image width={37} height={37} src={instagram} alt="" />
                            </Link>
                        </li>
                        {/* <li>
                            <Link href={'Facebook.com'}>
                                <Image width={37} height={37} src={twitter} alt="" />
                            </Link>
                        </li> */}
                        <li>
                            <Link href={'https://www.linkedin.com/company/lensys-in/'} target="_blank">
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
                    Copyright {currentYear} | Lensys Pvt. Ltd | <Link href="https://techmatrick.com" passHref={true} target="_blank">Code & Design Credits</Link>
                </p>
            </div>
        </div>
    </footer>
  )
}

export default Footer