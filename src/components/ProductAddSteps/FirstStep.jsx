import React, {useEffect, useState} from 'react'

import StepProduct from './StepProduct'
import Image from 'next/image'

import singlevisionlens from '../../images/single-vision.svg'
import blueProtect from '../../images/blue-protect.svg'
import bifocal from '../../images/bifocal.svg'
import prog from '../../images/progressive.svg'

import api from '@/api/api'
import { useDispatch, useSelector } from 'react-redux'
import { updateProductAdd } from '@/store/features/productAdd/productAddSlice'

const FirstStep = ({id, colorId}) => {
    const [lensTypes, setLensTypes ] = useState(null);
    const fetchLensTypes = async()=>{
        const response = await api.get('lensestypes');
        const data = await response.data;
        setLensTypes(data);
    }

    useEffect(() => {
        fetchLensTypes();
    }, [])

    const productData = useSelector((state)=> state.productData.value)
    
    const dispatch = useDispatch();

    const updateLensTypes = (e)=>{
        const vl = e.target.value;
        dispatch(updateProductAdd({...productData, lensType: vl}))
    }

  return (
    <>
        <div className="inner-steps first-step">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className='l-part'>
                        <StepProduct id={id} colorId={colorId} />
                    </div>
                    <div className='r-part'>
                        <div className="lens-type-select-container">
                            {
                                lensTypes &&
                                lensTypes?.map((lens, index)=>(
                                    <div className="le_radio-check" key={index}>
                                        <input type="radio" name="lenseType" defaultChecked={productData.lensType && productData.lensType == lens.id} onChange={(e)=>updateLensTypes(e)} id={`vision-${index}`} value={lens.id} />
                                        <label htmlFor={`vision-${index}`}>
                                            <div className="ic">
                                                <Image src={lens.image || singlevisionlens} width={50} height={50} alt="" />
                                            </div>
                                            <div className="det">
                                                <h3>{lens.name}</h3>
                                                <p>{lens.description}</p>
                                            </div>
                                            <span></span>
                                        </label>
                                    </div>
                                ))
                            }
                          
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default FirstStep