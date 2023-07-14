import React, {useState, useEffect} from 'react'

import StepProduct from './StepProduct'

import LensCard from './lensCard';
import ColorRadios from '../ColorRadios';

const SecondStep = () => {

  const [tab, setTab] = useState(1);

  const SampleData = [
    {
      id: 1,
      name: "Anti glare lenses",
      features: ["6 month warrenty", "1.56 Index", "Blue Light Blocker"],
      price: 999,
      offers: {
        label: 'value for money',
        level: 'moderate'
      }
    },
    {
      id: 2,
      name: "Anti glare lenses",
      features: ["6 month warrenty", "1.56 Index", "Blue Light Blocker"],
      price: 999,
      offers: {
        label: 'value for money',
        level: 'moderate'
      }
    },
    {
      id: 3,
      name: "Anti glare lenses",
      features: ["6 month warrenty", "1.56 Index", "Blue Light Blocker"],
      price: 999,
      offers: {
        label: 'value for money',
        level: 'moderate'
      }
    },
  ]

  const colors =[
    {
      label: 'Cyan Blue',
      code: '#19CFFD'
    },
    {
      label: 'Charcoal',
      code: '#6C6C6C'
    },
    {
      label: 'Cyan Blue',
      code: '#19CFFD'
    },
    {
      label: 'Cyan Blue',
      code: '#19CFFD'
    },
  ]

  return (
    <>
        <div className="inner-steps first-step">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className='l-part'>
                        <StepProduct />
                    </div>
                    <div className='r-part'>
                        <div className="l-t-tabs">
                          <ul>
                            <li>
                              <button onClick={()=>setTab(1)} className={`${tab == 1?'active':''}`}>Lens</button>
                            </li>
                            <li>
                              <button onClick={()=>setTab(2)} className={`${tab == 2?'active':''}`}>Tint</button>
                            </li>
                          </ul>
                        </div>
                        <div className="l-t-tab-area pt-8">
                          {
                            tab == 1?
                            <div>
                                <ul className="select-lens-type-list ">
                                  {
                                    SampleData.map((item,index)=>(
                                      <LensCard lensDetails={item} key={index} />
                                    ))
                                  }
                                </ul> 
                            </div>:
                            <div>
                                <ul>
                                  <li>
                                    <div className="le_cus-radio">
                                      <input type="radio" id="v1" name='colorType' />
                                      <label htmlFor="v1">
                                        <p className='label'>No Tint</p>
                                      </label>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="le_cus-radio">
                                      <input type="radio" id="v2" name='colorType' />
                                      <label htmlFor="v2">
                                        <p className='label'>Mirror Lens</p>
                                        <p className='price'>+ ₹1995 <span>( including tax )</span></p>
                                      </label>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="le_cus-radio">
                                      <input type="radio" id="v3" name='colorType' />
                                      <label htmlFor="v3">
                                        <p className='label'>Colour Lens</p>
                                        <p className='price'>+ ₹1995 <span>( including tax )</span></p>
                                      </label>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="le_cus-radio">
                                      <input type="radio" id="v4" name='colorType' />
                                      <label htmlFor="v4">
                                        <p className='label'>Self Tinting Lens</p>
                                        <p className='price'>+ ₹1995 <span>( including tax )</span></p>
                                      </label>
                                    </div>
                                  </li>
                                </ul>
                                <h3 className="sm-head mt-5">
                                  Select Colors
                                </h3>
                                <ColorRadios data={colors} />
                            </div>
                          }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default SecondStep