'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import HeaderSearchBar from './HeaderSearchBar'
import HeaderCartBtn from './HeaderCartBtn'
import HeaderLoginArea from './HeaderLoginArea'

import logo from '../images/logo.png'
import Megamenu from './Megamenu'
import SelectDrop from '@/images/select-drop.svg'

import {useSelector, useDispatch} from 'react-redux';
import { updateUserData } from '@/store/features/userdata/UserDataSlice';
import { updateCartCount } from '@/store/features/cartcount/cartCountSlice'

import DragHandleIcon from '@mui/icons-material/DragHandle';
import CloseIcon from '@mui/icons-material/Close';

import customToast from '@/utils/CusToast'

import api from '@/api/api'
import { ToastContainer } from 'react-toastify'

import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

import gReview from '../images/g-review.svg'


const Header = () => {

    const [categories, setCatagories] = useState([])
 
    const fetchCategories = async() =>{
        const response = await api.get('categories');
        setCatagories(response.data)
    }

    useEffect(() =>{
        fetchCategories();
    },[])

    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });
    
    const [menuOpen, setMenuOpen] = useState(false);

    const [megamenuOpen, setMegamenuOpen] = useState({});

    const isSticky = (e) => {
        const header = document.querySelector('.main-nav-main');
        const scrollTop = window.scrollY;
        scrollTop >= 250 ? header.classList.add('is-sticky') : header.classList.remove('is-sticky');
    };

    const user = useSelector(state=>state.userData.value);
    const dispatch = useDispatch();
    useEffect(()=>{
        const accessToken = localStorage.getItem('access_token');
        console.log("auth", accessToken);
        if(!accessToken){
        return;
        }
        const regen = async() => {
            try{
                const res = await api.get(`reGenToken?auth=${accessToken}`)  
                if(res.data.status){
                    dispatch(updateUserData({...res.data, ...{loggedin:true}}))
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    dispatch(updateCartCount(res.data.cartcount || 0));
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    localStorage.setItem('access_token', res.data.access_token);
                }else{
                    dispatch(updateUserData({loggedin:false}))
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    customToast('Session expired please try to login again', 'error');
                    localStorage.removeItem('access_token');
                }
            }catch (err) {
                customToast('Something went wrong', 'error')
            }
        }
        
        regen();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleToggleMegamenu = (index) => {
        const updatedMegamenuOpen = { ...megamenuOpen };
        updatedMegamenuOpen[index] = !updatedMegamenuOpen[index];
        setMegamenuOpen(updatedMegamenuOpen);
    };

    return (
        <>
            <ToastContainer />
            <div className={`overlay ${menuOpen?'active':''}`} onClick={()=>setMenuOpen(false)}></div>
            <div className="main-nav-main">
                <nav className="main-nav">
                    <div className="l-part">
                        <button className='menu-btn md:hidden' onClick={()=>setMenuOpen(true)}>
                            <DragHandleIcon style={{ 'color': 'white', 'width': '40px', 'height': '40px' }} />
                        </button>
                        <Link href='/' className='logo'>
                            <Image src={logo} alt="" />
                        </Link>
                    </div>
                    <div className="m-part">
                    <HeaderSearchBar />
                    </div>
                    <div className="r-part">
                        <ul className="ot-list">
                            <li>
                                <Image src={gReview} width={150} alt="" />
                            </li>
                            <li>
                                <HeaderCartBtn count="2" />
                            </li>
                            <li>
                                <HeaderLoginArea />
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="bottom-nav">
                    <ul className="nav-list">
                        {   
                            categories.length > 0 &&
                            categories?.map((cat,index)=>(
                                <li className='has-mega-menu' key={index}>
                                    <Link href={'products/'+cat.id}>
                                        <span>{cat.name}</span>
                                        <Image src={SelectDrop} alt="" width={20} height={20} />
                                    </Link>
                                    <Megamenu subCat={cat.id} />
                                </li>
                            ))
                        }
                    </ul>
                    <ul className="head-con-list">
                            <li className='con-ac'>
                                <span><PhoneIcon /></span>
                                <a href="tel:7470560626">
                                    +91 7470560626
                                </a>
                            </li>
                            <li className='con-ac'>
                                <span><EmailIcon /></span>
                                <a href="mailto:support@lensys.in">
                                    support@lensys.in
                                </a>
                            </li>
                    </ul>
                </div>
            </div>

            {/* mobile navigation */}
            <div className={`mobile-nav ${menuOpen?'active':''}`}>
                <div className="mob-menu-top w-full flex items-center justify-between pl-3 pr-5 pt-3 pb-3">
                    <Link href="/" className='block logo'>
                        <Image src={logo} alt="" />
                    </Link>
                    <button className='menu-close' onClick={()=>setMenuOpen(false)}>
                        <CloseIcon style={{ 'color': 'white' }} />
                    </button>
                </div>
                <div className="relative pl-3 pr-3 pt-3 pb-3">
                    <HeaderSearchBar />


                </div>
                {/* list */}
                <ul className="nav-list">
                    {   
                        categories.length > 0 &&
                        categories?.map((cat,index)=>(
                            <li className='has-mega-menu' key={index}>
                                <Link href={''}  className='flex items-center justify-between' onClick={()=>handleToggleMegamenu(index)}>
                                    <span>{cat.name}</span>
                                    <Image src={SelectDrop} alt="" width={20} height={20} />
                                </Link>
                                {
                                    megamenuOpen[index]?<Megamenu subCat={cat.id} setMenuOpen={setMenuOpen} />:''
                                }
                            </li>
                        ))
                    }
                    {/* <li className='has-mega-menu'>
                        <Link href="" className='flex items-center justify-between' onClick={()=>{setMegamenuOpen((prev)=> !prev)}}>
                            <span>Eyeglasses</span>
                            <Image src={SelectDrop} alt="" width={20} height={20} />
                        </Link>
                        {
                            megamenuOpen?<Megamenu />:''
                        }
                        
                    </li>
                    <li>
                        <Link href="">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link href="">
                            Eyeglasses
                        </Link>
                    </li>
                    <li>
                        <Link href="">
                            Eyeglasses
                        </Link>
                    </li>
                    <li>
                        <Link href="">
                            Eyeglasses
                        </Link>
                    </li> */}
                </ul>
            </div>
        </>
    )
}

export default Header