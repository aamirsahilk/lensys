import React from 'react'
import Image from 'next/image'
import cross from '../images/cross.svg'

const StepHeader = () => {
  return (
    <div className="step-header">
        <p>Select Power Type</p>
        <button classs="close">
            <Image src={cross} width={22} height={22} alt="" />
        </button>
    </div>
  )
}

export default StepHeader