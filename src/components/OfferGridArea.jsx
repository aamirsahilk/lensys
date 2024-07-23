import React, {useEffect, useState} from 'react'
import SecHeading from './SecHeading'
import Link from 'next/link'
import Image from 'next/image'

import api from '@/api/api'

import fit1 from '@/images/fit1.jpg'
import fit2 from '@/images/fit2.jpg'
import fit3 from '@/images/fit3.jpg'
import fit4 from '@/images/fit4.jpg'
import fit5 from '@/images/fit5.jpg'

const OfferGridArea = () => {
    const [banners,setBanners] = useState([]);
    const fetchBanner = async()=>{
        const res = await api.get('/banner/2');
        setBanners(res.data)
    }
    useEffect(() => {
        fetchBanner();
    },[])
  return (
    <section className='le_offer-grid-area sec'>
        <div className="container mx-auto">
            <SecHeading centerLine={true} >
                <span>Find The </span>Perfect Fit
            </SecHeading>
            <br />
            <div className="le_offer-grid ">
                {
                    banners&&
                    banners?.map((banner,index) =>(
                        <Link href={banner.link} key={index} passHref={true}>
                            <Image className='' src={banner.image} alt={banner.alttext} width={1080} height={1080} />
                        </Link>
                    ))
                }
            </div>
        </div>
    </section>
  )
}

export default OfferGridArea