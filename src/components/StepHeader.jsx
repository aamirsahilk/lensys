import React from 'react'
import Image from 'next/image'
import cross from '../images/cross.svg'
import Link from 'next/link'

const StepHeader = () => {
  return (
    <div className="step-header">
        <p>Select Power Type</p>
        <Link href="/" className="close">
            <Image src={cross} width={22} height={22} alt="" />
        </Link>
    </div>
  )
}

export default StepHeader