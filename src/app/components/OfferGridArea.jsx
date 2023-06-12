import React from 'react'
import SecHeading from './SecHeading'
import Link from 'next/link'
import Image from 'next/image'

const OfferGridArea = () => {
  return (
    <section className='le_offer-grid-area sec'>
        <div className="container mx-auto">
            <SecHeading centerLine={true} >
                <span>Find The </span>Perfect Fit
            </SecHeading>
            <div className="le_offer-grid">
                <Link href="">
                    <Image className='' src="" alt="" width={500} height={500} />
                </Link>
                <Link href="" className=''>
                    <Image className='' src="" alt="" width={500} height={500} />
                </Link>
                <Link href="" className=''>
                    <Image className='' src="" alt="" width={500} height={500} />
                </Link>
                <Link href="" className=''>
                    <Image className='' src="" alt="" width={500} height={500} />
                </Link>
                <Link href="" className=''>
                    <Image className='' src="" alt="" width={500} height={500} />
                </Link>
            </div>
        </div>
    </section>
  )
}

export default OfferGridArea