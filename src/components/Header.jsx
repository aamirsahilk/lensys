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
        const header = document.querySelector('.main-nav');
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
                const res = await api.get('reGenToken',{},{
                    headers: {
                        'Authorization': `${accessToken}`
                    }
                })
                if(res.data.status){
                    dispatch(updateUserData({...res.data, ...{loggedin:true}}))
                    dispatch(updateCartCount(res.data.cartcount));
                    localStorage.setItem('access_token', res.data.access_token);
                }else{
                    dispatch(updateUserData({loggedin:false}))
                    customToast('Session expired please try to login again', 'error')
                }
            }catch (err) {
                customToast('Something went wrong', 'error')
            }
        }
        
        regen();
    },[])

    const handleToggleMegamenu = (index) => {
        const updatedMegamenuOpen = { ...megamenuOpen };
        updatedMegamenuOpen[index] = !updatedMegamenuOpen[index];
        setMegamenuOpen(updatedMegamenuOpen);
    };

    return (
        <>
            <div className={`overlay ${menuOpen?'active':''}`} onClick={()=>setMenuOpen(false)}></div>
            <nav className="main-nav">
                <div className="l-part">
                    <button className='menu-btn md:hidden' onClick={()=>setMenuOpen(true)}>
                        <DragHandleIcon style={{ 'color': 'white', 'width': '40px', 'height': '40px' }} />
                    </button>
                    <Link href='/'>
                        <Image src={logo} alt="" />
                    </Link>
                </div>
                <div className="r-part">
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
                        {/* <li className='has-mega-menu'>
                            <Link href="">
                                <span>Eyeglasses</span>
                                <Image src={SelectDrop} alt="" width={20} height={20} />
                            </Link>
                            <Megamenu />
                        </li> */}
                        {/* <li>
                            <Link href="">
                                About
                            </Link>
                        </li>
                         */}
                        {/* <li>
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
                    <HeaderSearchBar />
                    <ul className="ot-list">
                        <li>
                            <HeaderCartBtn count="2" />
                        </li>
                        <li>
                            <HeaderLoginArea />
                        </li>
                    </ul>
                </div>
            </nav>

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