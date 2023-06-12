import React from 'react'
import cartIcon from '../../images/cart.svg'
import Image from 'next/image'

const HeaderCartBtn = ({count}) => {
  return (
    <button className='header-action-btn header-cart-btn'>
        <span>{count}</span>
        <div className="icon">
            <Image src={cartIcon} width={"50px"} height={"50px"} />
        </div>
    </button>
  )
}

export default HeaderCartBtn