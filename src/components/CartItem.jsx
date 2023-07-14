import React from 'react'
import Image from 'next/image'

import deleteIcon from '@/images/delete.svg'

const CartItem = () => {
  return (
    <div className='cart-item flex gap-5'>
        <div className="cart-img">
            {/* <Image src='' alt="" /> */}
        </div>
        <div className="cart-det flex flex-col justify-between items-end w-full">
            <div className='flex items-start justify-between w-full'>
                <div>
                    <h3>Vincent Chase Online</h3>
                    <p>Size: Medium • Classic Acetate</p>
                </div>
                <div>
                    <p className="price">7000</p>
                </div>
            </div>
            <button className='delete-btn'>
                <span>Remove</span>
                <Image src={deleteIcon} alt="" />
            </button>
        </div>

    </div>
  )
}

export default CartItem