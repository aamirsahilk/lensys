import React, {useState, useEffect} from 'react'


import StepProduct from './StepProduct'

import Image from 'next/image';
import eye from '@/images/eye.svg'
import st1 from '../../../public/images/step1.jpg'
import st2 from '../../../public/images/step2.jpg'
import upload from '@/images/upload-icon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { updateProductAdd } from '@/store/features/productAdd/productAddSlice';
import CancelIcon from '@mui/icons-material/Cancel';

// import LensCard from './LensCard';
import ColorRadios from '../ColorRadios';
import ManualPowerInputs from '../ManualPowerInputs';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const ThirdStep = ({id, colorId}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [subEr, setSubEr] = useState(false)
  const dispatch = useDispatch();
  const productData = useSelector((state)=> state.productData.value)
  const isEmpty = (obj) => {
    return Object.keys(obj).length !== 0;
  };
  const handleFileChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(null);
      if (!file) {
          setFileError('Please select a file.');
          return;
      }
      if (
          file.type !== 'application/pdf' &&
          !file.name.endsWith('.doc') &&
          !file.name.endsWith('.docx')
      ) {
          setFileError('Please select a PDF or Word document file.');
          return;
      }
      if (file.size > 5 * 1024 * 1024) {
          setFileError('File size exceeds 5 MB limit.');
          return;
      }
      setFileError('')
      setSelectedFile(file);
      dispatch(updateProductAdd({...productData, file:file}))
  };
  const handleRemoveFile = ()=>{
    setSelectedFile(null)
    dispatch(updateProductAdd({...productData, file:null}))
  }
  useEffect(()=>{
    console.log('sel', selectedFile);
    if(selectedFile){
      dispatch(updateProductAdd({...productData, hasError:false}))
    }else{
      dispatch(updateProductAdd({...productData, hasError:true}))
    }
  }, [selectedFile])
  const handleCLick = (e)=>{
      const vl = e.target.dataset.value;
      // console.log('vl',vl, e.target);
      // console.log('vl', vl);
      let er = false;
      if(vl == 3 ){
        console.log('in ', vl);
        formik.handleSubmit()
        er = isEmpty(formik.errors);
        // dispatch(updateProductAdd({...productData, hasError:isEmpty(formik.errors)}))
      }else{
        console.log('out ', vl);
        console.log('dd', !selectedFile, vl == 2);
        if(vl == 2 && !selectedFile){
          // dispatch(updateProductAdd({...productData, hasError:true}))
          er = true;
        }else{
          // dispatch(updateProductAdd({...productData, hasError:'vjh'}))
          er = false;
        }
      }
      dispatch(updateProductAdd({...productData, prescription: vl, hasError:er}))
  }
  const validationSchema = Yup.object({
      rightEye: Yup.object({
          // rsd: Yup.string().required(),
          // rcd: Yup.string().required(),
          // rad: Yup.string().required(),
          // rsn: Yup.string().required(),
          // rcn: Yup.string().required(),
          // ran: Yup.string().required(),
      }),
      leftEye: Yup.object({
          // lsd: Yup.string().required(),
          // lcd: Yup.string().required(),
          // lad: Yup.string().required(),
          // lsn: Yup.string().required(),
          // lcn: Yup.string().required(),
          // lan: Yup.string().required(),
      }),
      pd: Yup.object({
          // pd1: Yup.number().required().max(180),
          // pd2: Yup.number().required().max(180),
          // pd3: Yup.number().required().max(360),
      }),
  });

  const formik = useFormik({
      enableReinitialize: true,
      initialValues: {},
      validationSchema,
      onSubmit: (values) => {
          const obj = { ...values.rightEye, ...values.leftEye, ...values.pd };
          dispatch(updateProductAdd({...productData, ...obj}))
      },
      
  });

  useEffect(()=>{
    dispatch(updateProductAdd({...productData, prescription: 1}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(()=>{
    console.log('product Data', productData);
  }, [productData])

  // useEffect(()=>{
    
  // },[formik])
  const handleSubmit = ()=>{
    
    formik.handleSubmit()
    setSubEr(isEmpty(formik.errors));
    console.log('er', formik.errors);
    dispatch(updateProductAdd({...productData, hasError:isEmpty(formik.errors)}))
    // console.log('er', isEmpty(formik.errors));
  }

  const [tab, setTab] = useState(3);

  const data = {
    prescription:{
      status: false
    }
  }

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
                            <button data-value="2" className={`${tab==2?'active':''}`} onClick={(e)=>{tabChange(2);handleCLick(e)}}>
                              <span>upload prescription</span>
                            </button>
                          </li>
                          {/*}li>
                            <button data-value="3" className={`${tab==1?'active':''}`} onClick={(e)=>{tabChange(1);handleCLick(e)}}>
                              <span>Enter Manually</span>
                            </button>
                          </li> */}
                        </ul>
                        <div className="tab-content">
                          {
                            tab == 1?
                            <div className="tab-content-inner">
                              
                              <ManualPowerInputs data={data} formik={formik} />
                              <button className='main-btn mt-4' onClick={()=>{handleSubmit()}}><span>Update</span></button>
                              {/* <div className="re-le-wrapper">
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
                              </p> */}
                            </div>: tab == 2?
                            <div className="tab-content-inner">
                              <label for="file1" className="big-upload-btn" >
                                  <input
                                      type="file"
                                      accept=".pdf, .doc, .docx"
                                      onChange={handleFileChange}
                                      style={{ display: 'none' }}
                                      id="file1"
                                  />
                                  <Image src={upload} alt="" />
                                  <span>Upload Your Prescription</span>
                              </label>
                              <p className="sm-text text-center mt-2">Note : Document should be in PDF* format under 5MiB</p>
                              {
                                  fileError != '' &&
                                  <div className='act-msg error center'>
                                      <p>
                                          {fileError}
                                      </p>
                                  </div>
                              }
                              {
                                  selectedFile &&
                                  <div className='selected-file center'>
                                      <div>
                                          <p>{selectedFile.name}</p>
                                      </div>
                                      <button className='remove-file' onClick={() => handleRemoveFile()}>
                                          <CancelIcon />
                                      </button>
                                  </div>
                              }
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
                                    <Image src={st1} alt="" />
                                  </div>
                                  <p className="para">
                                    <b>Access Your Order History</b> <br />
                                    Go to your dashboard and click on My Orders to access all your orders <br />
                                    On Orders list page click on specific order<br />
                                  </p>
                                </div>
                                <div className="hw-step">
                                  <h3>Step 2</h3>
                                  <div className="hw-step-img">
                                    <Image src={st2} alt="" />
                                  </div>
                                  <p className="para">
                                    <b>Upload prescription details</b> <br />
                                    Click on upload prescription button (modal will be open)<br />
                                    select method manual or upload pdf <br />
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