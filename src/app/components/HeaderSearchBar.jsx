import React from 'react'
import Image from 'next/image';
import searchIcon from '../../images/search.svg';

const HeaderSearchBar = () => {
  return (
    <div className='header-search-bar-container'>
        <Image src={searchIcon} width={"50px"} height={"50px"} alt="" />
        <input type="text" placeholder='Search Here...' />
    </div>
  )
}

export default HeaderSearchBar