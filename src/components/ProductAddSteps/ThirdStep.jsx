import React, {useState, useEffect} from 'react'


import StepProduct from './StepProduct'

import Image from 'next/image';
import eye from '@/images/eye.svg'
import upload from '@/images/upload-icon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { updateProductAdd } from '@/store/features/productAdd/productAddSlice';

// import LensCard from './LensCard';
import ColorRadios from '../ColorRadios';

const ThirdStep = ({id, colorId}) => {
  const dispatch = useDispatch();
  const productData = useSelector((state)=> state.productData.value)
  const handleCLick = (e)=>{
      const vl = e.target.dataset.value;
      dispatch(updateProductAdd({...productData, prescription: vl}))
  }
  useEffect(()=>{
    dispatch(updateProductAdd({...productData, prescription: 1}))
  },[productData,dispatch])

  const [tab, setTab] = useState(3);

  const tabChange = (tb)=>{
    setTab(tb)
  }

  return (
    <>
        <div className="inner-steps last-step">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className='l-part'>
                        <StepProduct id={id} colorId={colorId} />
                    </div>
                    <div className='r-part '>
                        <h3 className="sm-head">
                        What About My Eye Power?
                        </h3>
                        <ul className="radio-tabs mb-8 pb-5">
                          <li>
                            <button data-value="1" className={`${tab==3?'active':''}`} onClick={(e)=>{tabChange(3);handleCLick(e)}}>
                              <span>upload later</span>
                            </button>
                          </li>
                          
                          <li>
                            <button data-value="2" className={`${tab==2?'active':''}`} onClick={()=>{tabChange(2);handleCLick(e)}}>
                              <span>upload prescription</span>
                            </button>
                          </li>
                          <li>
                            <button data-value="3" className={`${tab==1?'active':''}`} onClick={()=>{tabChange(1);handleCLick(e)}}>
                              <span>Enter Manually</span>
                            </button>
                          </li>
                        </ul>
                        <div className="tab-content">
                          {
                            tab == 1?
                            <div className="tab-content-inner">
                              <div className="re-le-wrapper">
                                <div className="re-part">
                                  <div className="flex items-center gap-2 e-wr">
                                    <Image src={eye} alt="" width={30} height={30} />
                                    <span>Right Eye</span>
                                  </div>
                                  <div className="opt-table mt-3">
                                    <div className="op-row">
                                      <div className="op-cell"></div>
                                      <div className="op-cell">
                                        <p>Sph</p>
                                      </div>
                                      <div className="op-cell">
                                        <p>Cyl</p>
                                      </div>
                                      <div className="op-cell">
                                        <p>Axis</p>
                                      </div>
                                    </div>
                                    <div className="op-row">
                                      <div className="op-cell">
                                        <p>D.V</p>
                                      </div>
                                      <div className="op-cell">
                                        <input type="text" name="sph" />
                                      </div>
                                      <div className="op-cell">
                                        <input type="text" name="cyl" />
                                      </div>
                                      <div className="op-cell">
                                        <input type="text" name="axis" />
                                      </div>
                                    </div>
                                    <div className="op-row">
                                      <div className="op-cell">
                                        <p>N.V</p>
                                      </div>
                                      <div className="op-cell">
                                        <input type="text" name="sph" />
                                      </div>
                                      <div className="op-cell">
                                        <input type="text" name="cyl" />
                                      </div>
                                      <div className="op-cell">
                                        <input type="text" name="axis" />
                                      </div>
                                    </div>
                                  </div>
                                  
                                </div>
                                <div className="le-part">
                                  <div className="flex items-center gap-2 e-wr">
                                    <Image src={eye} alt="" width={30} height={30} />
                                    <span>Left Eye</span>
                                  </div>
                                  <div className="opt-table mt-3">
                                    <div className="op-row">
                                      <div className="op-cell"></div>
                                      <div className="op-cell">
                                        <p>Sph</p>
                                      </div>
                                      <div className="op-cell">
                                        <p>Cyl</p>
                                      </div>
                                      <div className="op-cell">
                                        <p>Axis</p>
                                      </div>
                                    </div>
                                    <div className="op-row">
                                      <div className="op-cell">
                                        <p>D.V</p>
                                      </div>
                                      <div className="op-cell">
                                        <input type="text" name="sph" />
                                      </div>
                                      <div className="op-cell">
                                        <input type="text" name="cyl" />
                                      </div>
                                      <div className="op-cell">
                                        <input type="text" name="axis" />
                                      </div>
                                    </div>
                                    <div className="op-row">
                                      <div className="op-cell">
                                        <p>N.V</p>
                                      </div>
                                      <div className="op-cell">
                                        <input type="text" name="sph" />
                                      </div>
                                      <div className="op-cell">
                                        <input type="text" name="cyl" />
                                      </div>
                                      <div className="op-cell">
                                        <input type="text" name="axis" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <p className="sm-text mt-8">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut similique sunt ipsum vero vel mollitia deserunt, maiores nobis hic voluptatem numquam dolore soluta, in iure, perspiciatis unde. Quis, amet optio!
                              </p>
                            </div>: tab == 2?
                            <div className="tab-content-inner">
                              <button className="big-upload-btn">
                                <Image src={upload} alt="" />
                                <span>Upload Your Prescription</span>
                              </button>
                              <p className="sm-text text-center mt-2">Note : Document should be in PDF* format under 5MiB</p>
                            </div>:
                            <div className="tab-content-inner">
                              <ul className="le-points">
                                <li>
                                  You can submit your eye power after Payment step
                                </li>
                              </ul>
                              <div className="hw-steps grid mt-8 grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="hw-step">
                                  <h3>Step 1</h3>
                                  
                                  <div className="hw-step-img">
                                    
                                  </div>
                                  <p className="para">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, veniam nam ipsam pariatur dolor amet id non qui libero accusantium 
                                  </p>
                                </div>
                                <div className="hw-step">
                                  <h3>Step 1</h3>
                                  
                                  <div className="hw-step-img">

                                  </div>
                                  <p className="para">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, veniam nam ipsam pariatur dolor amet id non qui libero accusantium 
                                  </p>
                                </div>
                              </div>
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

export default ThirdStep