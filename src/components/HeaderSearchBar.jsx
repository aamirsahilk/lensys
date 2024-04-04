'use client'
import React, {useState, useEffect} from 'react'
import Image from 'next/image';
import searchIcon from '../../public/images/search.svg';

import dropicon from '../../public/images/drop-icon.svg';
import crosswhite from '../../public/images/crosswhite.svg';
import { useRouter } from 'next/navigation';

import { usePathname, useSearchParams } from 'next/navigation'

import api from '@/api/api';

const HeaderSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCatagories] = useState(null);
  const [selected, setSelected] = useState(null);

  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const searchParamsToObject = () => {
    const obj = {};
    for (const [key, value] of searchParams) {
      obj[key] = value;
    }
    return obj;
  };
  const searchParamsObject = searchParamsToObject();
  
  useEffect(() => {
    searchParamsObject.search && setSearchQuery(searchParamsObject.search)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const fetchCategories = async() =>{
    const response = await api.get('categories');
    setCatagories(response.data)
    setSelected('all');
  }

  const router = useRouter();

  const handleRemove = ()=>{
    setSearchQuery('');
    router.push(`/products/${selected}`);
  }
  
  const handleSubmit = (e)=>{
    e.preventDefault();
    router.push(`/products/${selected}?search=${searchQuery}`);
  }

  useEffect(() =>{
      fetchCategories();
  },[])

  return (
    <div className='header-search-bar-container'>
      <form onSubmit={handleSubmit}>
        <div className="select-wrap">
          <select name="" id="" defaultValue={categories ? categories[0].id : ""} onChange={(e)=>setSelected(e.target.value)}>
            <option value={'all'}>{'All'}</option>
            {
              categories &&
              categories.map((item,index)=>(
                <option key={index} value={item.id}>{item.name}</option>
              ))
            }
          </select>
          <Image src={dropicon} alt="" />
        </div>
        {
          searchQuery != '' ?
          <div className='search-icon' onClick={handleRemove} >
            <Image src={crosswhite}  width={"50px"} height={"50px"} alt="" />
          </div>
          :
          <Image src={searchIcon} className='search-icon' width={"50px"} height={"50px"} alt="" />

        }
        <input type="text" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} placeholder='Search Here...' />
      </form>
    </div>
  )
}

export default HeaderSearchBar