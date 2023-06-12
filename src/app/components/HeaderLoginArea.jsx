import React from 'react'
import person from '../../images/person.svg'
import Image from 'next/image'

const HeaderLoginArea = () => {
  return (
    <button class="header-action-btn header-login-btn">
        <Image src={person} width={"50px"} height={"50px"} alt="" />
    </button>
  )
}

export default HeaderLoginArea