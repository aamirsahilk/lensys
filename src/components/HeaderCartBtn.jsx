import React from 'react'
import cartIcon from '../images/cart.svg'
import Image from 'next/image'

import {useSelector} from 'react-redux'

import Link from 'next/link'

const HeaderCartBtn = () => {

  const count = useSelector((state)=>state.cartCountSlice.value)

  return (
    <Link href="/cart" className='header-action-btn header-cart-btn'>
        <span>{count}</span>
        <div className="icon">
            <Image src={cartIcon} width={"50px"} height={"50px"} alt="" />
        </div>
    </Link>
  )
}

export default HeaderCartBtn