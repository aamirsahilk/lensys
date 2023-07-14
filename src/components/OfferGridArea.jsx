import React from 'react'
import SecHeading from './SecHeading'
import Link from 'next/link'
import Image from 'next/image'

import fit1 from '@/images/fit1.jpg'
import fit2 from '@/images/fit2.jpg'
import fit3 from '@/images/fit3.jpg'
import fit4 from '@/images/fit4.jpg'
import fit5 from '@/images/fit5.jpg'

const OfferGridArea = () => {
  return (
    <section className='le_offer-grid-area sec'>
        <div className="container mx-auto">
            <SecHeading centerLine={true} >
                <span>Find The </span>Perfect Fit
            </SecHeading>
            <br />
            <div className="le_offer-grid ">
                <Link href="">
                    <Image className='' src={fit1} alt="" width={500} height={500} />
                </Link>
                <Link href="" className=''>
                    <Image className='' src={fit2} alt="" width={500} height={500} />
                </Link>
                <Link href="" className=''>
                    <Image className='' src={fit3} alt="" width={500} height={500} />
                </Link>
                <Link href="" className=''>
                    <Image className='' src={fit4} alt="" width={500} height={500} />
                </Link>
                <Link href="" className=''>
                    <Image className='' src={fit5} alt="" width={500} height={500} />
                </Link>
            </div>
        </div>
    </section>
  )
}

export default OfferGridArea