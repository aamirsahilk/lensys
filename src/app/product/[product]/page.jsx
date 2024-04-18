'use client'
import React, {useState, useEffect, useCallback} from 'react'
import ProductInnerMainSlider from '../../../components/ProductInnerMainSlider'
import SecHeading from '../../../components/SecHeading'
import CheckPincode from '../../../components/CheckPincode'
import CustomButton from '../../../components/CustomButton'
import ProductInnerTabs from '../../../components/ProductInnerTabs'
import Link from 'next/link'
import Image from 'next/image'
import offerImage from '../../../images/offer-banner.jpg'
import ProductCard from '../../../components/ProductCard'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import LoginSigup from '@/components/LoginSigup'

import ContactLensPowerSelect from '@/components/ContactLensPowerSelect'

import api from '@/api/api'
import OfferSlider from '@/components/OfferSlider'

const ProductInner = ({params}) => {
  const [isLens, setIsLens] = useState(false);
  
  // 1 = eye
  // 2 = sunglass
  // 3 = colorcontact
  // 4 = corrective
  const userdata = useSelector((state)=> state.userData.value );
  const productSlug = params.product;
  const [product, setProduct] = useState({});
  const [colorId, setColorId] = useState(null);
  const [lensObj, setLensObj] = useState({});
  const [lensError, setLensError] = useState(false);
  const [adding, setAdding] = useState(false);
  const fetchProduct = useCallback(async()=>{
    const response = await api.get(`product/${productSlug}`);
    const data = response.data;
    setProduct(p=>data);
    setColors(data?.colors || []);
    setColor(data?.colors ? data?.colors[0]?.color_name : '')
    setColorId(data?.colors ? data?.colors[0]?.id : '')
  },[productSlug])
 
  const {id,slug,product_name, product_price, regular_price, currency, product_description, attributes, qty, image, extras, categoryid, short_desc, couponimages} = product;

  const [isMobile, setIsMobile] = useState(false);
  const [size, setSize] = useState(null);
  const handleOpen = (value) => setSize(value)
  
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if(categoryid == 4 || categoryid == 3){
      setIsLens(true)
    }
  },[categoryid])

  const { push } = useRouter();

  const addToCart = async () => {
    setAdding(true);
    // return
    if(userdata.loggedin){
      if(categoryid == 4 || categoryid == 3){
        if(Object.keys(lensObj).length === 0){
          setLensError(true);
          setTimeout(() => {
            setLensError(false);
          }, 2500);
          return
        }
        if (lensObj.qty && !lensObj.powerRight) {
          setLensError(true);
          setTimeout(() => {
            setLensError(false);
          }, 2500);
          return
        }
        if (lensObj.qty2 && !lensObj.powerLeft) {
          setLensError(true);
          setTimeout(() => {
            setLensError(false);
          }, 2500);
          return
        }
        var formData = new FormData();
        Object.keys(lensObj).forEach((key) => {
            formData.append(key, lensObj[key]);
        });
        formData.append('productid', id);
        if(colorId){
          formData.append('colorid', colorId);
        }
        const res = await api.post(`addtocart?auth=${userdata.access_token}`, formData);
        const data = res.data;
        if(data.status){
          setAdding(false);
          push('/cart');
        }
      }else{
        var formData = new FormData();
        formData.append('productid', id);
        // if(categoryid != 2){
        formData.append('colorid', colorId);
        // }
        const res = await api.post(`addtocart?auth=${userdata.access_token}`, formData);
        const data = res.data;
        if(data.status){
          setAdding(false);
          push('/cart');
        }
      }
    }else{
      setAdding(false);
      setSize(isMobile? 'xl': size || "md");
    }
    
  }

  useEffect(()=>{
    console.log('lensObj', lensObj);
  }, [lensObj])

  const fetchOtherDetails = useCallback(async()=>{
    if(colorId){
      const response = await api.get(`productimages${colorId ? "/"+colorId : ''}`);
      const data = response.data;
      setProduct((state)=>{return {...state, ...data}});
    }
  },[colorId])
  
  useEffect(() => {
    fetchOtherDetails();
    
  },[fetchOtherDetails])
  const [color, setColor] = useState('Japanese Gold')
  const [colors, setColors] = useState([])

  return (
    <>
        <Dialog
          open={
            size === "xs" ||
            size === "sm" ||
            size === "md" ||
            size === "lg" ||
            size === "xl" ||
            size === "xxl"
          }
          size={isMobile? 'xl': size || "md"}
          handler={handleOpen}
          
        >
          
          <DialogBody className='p-8 rounded-xl'>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
              
              <div className="relative">
                <LoginSigup handleOpen={handleOpen} />
              </div>
            </div>
          </DialogBody>
        </Dialog>
      <main className='le_product-inner-page'>
          <div className="container mx-auto">
            <section className="sec">
              <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-14">
                <div className="relative md:sticky md:top-24 self-start">
                  <ProductInnerMainSlider thumbs={extras} mainImage={image} />
                </div>
                <div className="relative">
                  <SecHeading>
                    {product_name || 'Spectus'}
                  </SecHeading>
                  {
                    short_desc &&
                    <p className="para mt-5">
                      {short_desc}
                    </p>
                  }
                  <div className="price-wrapper mt-5">
                    {
                      regular_price > product_price &&
                      <span className="off">
                        {
                        `-${(product_price / regular_price) * 100}%`
                        }
                      </span>
                    }
                    <p>{currency || '₹'} {product_price || '1600.00'} </p>
                    {
                      <span className='mrp'>
                        <span>
                        {
                          `MRP ${regular_price}`
                        }
                        </span>
                        ( Ex GST )
                      </span>
                    }
                  </div>
                  {/* <div className="act-msg suc">
                    <p>Delivered in 6-7 operational days</p>
                  </div> */}
                  {
                    colors.length > 0 &&
                    <div className="color-selector-wrapper mt-5">
                        <p className="para dark">
                          Color : <span>{color}</span>
                        </p>
                        <div className="flex flex-wrap gap-5 mt-5">
                          {
                            colors?.map((col, index)=>{
                              // const styles = 
                              // console.log('colors...', col.color_code.length, styles );
                              return(
                                <div className='color-selector' key={index}> 
                                  <input type="radio" defaultChecked={col.color_name == colors[0].color_name} value={col.color_name} name="color" data-id={col.id} onChange={ev=>{setColor(ev.target.value);setColorId(ev.target.dataset.id)}} id={`color-${index}`} />
                                  <label htmlFor={`color-${index}`}>
                                    <span className='color' style={
                                      col.color_code.length === 1 ? 
                                      {background: col.color_code[0]}:
                                      {background: `linear-gradient(to left, ${col.color_code[0]} 50%,${col.color_code[1]} 50%)`}
                                      }></span>
                                    <p>{`${col.color_name}`} </p>
                                  </label>
                                </div>
                              )
                            })
                          }


                        </div>
                    </div>
                  }
                  {/* <CheckPincode /> */}
                  {
                    isLens ? <ContactLensPowerSelect setLensObj={setLensObj} /> : ''
                  }
                  {
                    lensError &&
                    <div className="act-msg error">
                      <p>Please select qnty</p>
                    </div>
                  }
                  
                  <div className="flex flex-wrap gap-2 mt-8">
                    {
                      isLens || categoryid == 2 ?
                      <button onClick={addToCart} disabled={adding} className='main-btn big'>
                        <span>Add To Cart</span>
                      </button>:
                      <>
                        <button onClick={addToCart} disabled={adding} className='main-btn big dark'>
                          <span>ONLY FRAME</span>
                        </button>
                        <Link href={`add-product/${slug}?pid=${id}&color=${colorId}`} className='main-btn big'>
                          <span>SELECT LENS</span>
                        </Link>
                      </>
                    }
                    {/* <CustomButton big={true} headerBtn={true}>SELECT LENSE</CustomButton> */}
                  </div>
                  <div className="relative mt-5">
                    <ul className="pointer-list">
                      <li>
                        Includes High-Quality Standard Lenses
                      </li>
                      <li>
                        30-Day Money Back Guarantee
                      </li>
                      <li>
                        Thin and light lenses as per your prescription
                      </li>
                    </ul>
                  </div>
                  
                </div>
              </div>
            </section>
          </div>
          <div className="seprator"></div>
          <section className="sec pr-tab-sec">
              <div className="container mx-auto">
                <div className="relative">
                    <ProductInnerTabs data={product} />
                </div>
              </div>
          </section>
          <div className="seprator"></div>
          {/* <Link href="" className="le_offer-link-banner">
            <Image src={offerImage} alt="offer" className='w-full'/>
          </Link> */}
          <OfferSlider data={couponimages} />
          <div className="seprator"></div>
          {/* <section className="sec pr-inner-pr-grid-sec">
            <div className="container mx-auto">
              <SecHeading centerLine={true}>
                <span>Find</span> The Perfect Fit
              </SecHeading>
              <div className="relative mt-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  <div className="relative">
                    <ProductCard />
                  </div>
                  <div className="relative">
                    <ProductCard />
                  </div>
                  <div className="relative">
                    <ProductCard />
                  </div>
                  <div className="relative">
                    <ProductCard />
                  </div>
                  <div className="relative">
                    <ProductCard />
                  </div>
                  <div className="relative">
                    <ProductCard />
                  </div>
                  <div className="relative">
                    <ProductCard />
                  </div>
                  <div className="relative">
                    <ProductCard />
                  </div>
              </div>
            </div>
          </section> */}
      </main>
    </>
  )
}

export default ProductInner