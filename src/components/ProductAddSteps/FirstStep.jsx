import React from 'react'

import StepProduct from './StepProduct'
import Image from 'next/image'

import singlevisionlens from '../../images/single-vision.svg'
import blueProtect from '../../images/blue-protect.svg'
import bifocal from '../../images/bifocal.svg'
import prog from '../../images/progressive.svg'

const FirstStep = () => {
  return (
    <>
        <div className="inner-steps first-step">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className='l-part'>
                        <StepProduct />
                    </div>
                    <div className='r-part'>
                        <div className="lens-type-select-container">
                            <div className="le_radio-check">
                                <input type="radio" name="lenseType" id="singlevision" />
                                <label htmlFor="singlevision">
                                    <div className="ic">
                                        <Image src={singlevisionlens} width={50} height={50} alt="" />
                                    </div>
                                    <div className="det">
                                        <h3>Single Vision / Powered Eyeglasses</h3>
                                        <p>For distance or near vision.</p>
                                    </div>
                                    <span></span>
                                </label>
                            </div>
                            <div className="le_radio-check">
                                <input type="radio" name="lenseType" id="bluepr" />
                                <label htmlFor="bluepr">
                                    <div className="ic">
                                        <Image src={blueProtect} width={50} height={50} alt="" />
                                    </div>
                                    <div className="det">
                                        <h3>Blue Protect Lenses ( No Power )</h3>
                                        <p>Fashion or Protection from Glare/Computer Screens etc.</p>
                                    </div>
                                    <span></span>
                                </label>
                            </div>
                            <div className="le_radio-check">
                                <input type="radio" name="lenseType" id="bifocal" />
                                <label htmlFor="bifocal">
                                    <div className="ic">
                                        <Image src={bifocal} width={50} height={50} alt="" />
                                    </div>
                                    <div className="det">
                                        <h3>Bifocal Eyeglasses</h3>
                                        <p>Distance & Near vision in same lenses.</p>
                                    </div>
                                    <span></span>
                                </label>
                            </div>
                            <div className="le_radio-check">
                                <input type="radio" name="lenseType" id="prog" />
                                <label htmlFor="prog">
                                    <div className="ic">
                                        <Image src={prog} width={50} height={50} alt="" />
                                    </div>
                                    <div className="det">
                                        <h3>Progressive Eyeglasses</h3>
                                        <p>Fashion or Protection from Glare/Computer Screens etc.</p>
                                    </div>
                                    <span></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default FirstStep