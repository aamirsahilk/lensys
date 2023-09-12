import React, {useCallback, useEffect, useState} from 'react'

import Image from 'next/image'
import Link from 'next/link'

import MenIcon from '@/icons/MenIcon'
import WomenIcon from '@/icons/WomenIcon'
import KidIcon from '@/icons/KidIcon'

import api from '@/api/api'

const Megamenu = ({subCat,setMenuOpen}) => {
    const [filters, setFilters] = useState([]);

    const fetchFilters =useCallback(async() =>{
      const res = await api.get('filters/'+subCat);
      const data = res.data;
      if(data){
        setFilters(data)
      }
    }, [subCat])
  
  
    useEffect(()=>{
      fetchFilters();
    }, [fetchFilters])

  return (
    <div className='mega-menu-wrapper'>
        <div className="mega-menu-inner">
            <div className="col">
                <h3>SHOP BY GENDER</h3>
                <ul className="gender-list">
                    <li>
                        <Link href={`products/${subCat}?subcategory=${'MEN'}`} onClick={()=>setMenuOpen && setMenuOpen(false)}>
                            <div className="ic">
                                <MenIcon />
                            </div>
                            <span>MEN</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={`products/${subCat}?subcategory=${'WOMEN'}`} onClick={()=>setMenuOpen && setMenuOpen(false)}>
                            <div className="ic">
                                <WomenIcon />
                            </div>
                            <span>WOMEN</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={`products/${subCat}?subcategory=${'KIDS'}`} onClick={()=>setMenuOpen && setMenuOpen(false)}>
                            <div className="ic">
                                <KidIcon />
                            </div>
                            <span>KIDS</span>
                        </Link>
                    </li>
                </ul>
            </div>
            {
                filters.brands &&
                <div className="col">
                    <h3>SHOP BY BRAND</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2">
                      
                            {
                                filters.brands.length > 0 &&
                                filters.brands.map((mp, index) => {
                                    return (
                                        
                                        <li key={index} onClick={()=>setMenuOpen && setMenuOpen(false)}>
                                            <Link href={`products/${subCat}?brand=${mp.id}`}>
                                                <span>{mp.name}</span>
                                            </Link>
                                        </li>
                                    
                                    )
                                })
                            }
                     
                        {/* <ul>
                            <li>
                                <Link href="/">
                                    <span>FASTRACK</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/">
                                    <span>FASTRACK</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/">
                                    <span>FASTRACK</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/">
                                    <span>FASTRACK</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/">
                                    <span>FASTRACK</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/">
                                    <span>FASTRACK</span>
                                </Link>
                            </li>
                        </ul> */}
                    </ul>
                </div>
            }
            {/* <div className="col">
                <h3>SHOP BY COLOUR</h3>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <ul>
                        <li>
                            <Link href="/">
                                <span>FASTRACK</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <span>FASTRACK</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <span>FASTRACK</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <span>FASTRACK</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <span>FASTRACK</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <span>FASTRACK</span>
                            </Link>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <Link href="/">
                                <span>FASTRACK</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <span>FASTRACK</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <span>FASTRACK</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <span>FASTRACK</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <span>FASTRACK</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <span>FASTRACK</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div> */}
        </div>
    </div>
  )
}

export default Megamenu