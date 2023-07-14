import React from 'react'
import Link from 'next/link'

import Spinner from '@/icons/Spinner';

const CustomButton = ({url, children, headerBtn, arrow, center, cusClass, big, secondary, xs, loading, color, blockBtn, dark}) => {
  var clas = `main-btn ${headerBtn?'header-btn':''} ${arrow?'flex items-center gap-2':''} ${center?'mx-auto d-block max-w-max':''} ${cusClass?cusClass:''} ${big?'big':''} ${secondary?'secondary':''} ${loading?'loading':''} ${xs?'sm':''} ${dark?'dark':''} ${blockBtn?'full':''}`;
  var style = `${color?'color:'+color:''}` 
  var HtmlArrow = arrow?<svg xmlns="http://www.w3.org/2000/svg" width="16" height="7" fill="none" viewBox="0 0 16 7">
    <path fill="#fff" d="M15.283 3.783a.4.4 0 0 0 0-.566L12.737.672a.4.4 0 0 0-.565.565L14.434 3.5l-2.262 2.263a.4.4 0 0 0 .565.565l2.546-2.545ZM0 3.9h15v-.8H0v.8Z"/>
  </svg>:'';
  if(url){
    return (
      <Link href={url} className={clas} style={{style}}>
          <span>{children}</span>
          {HtmlArrow}
      </Link>
    )
  }else{
    return (
      <button className={clas} style={{style}}>
          {
            loading?
            <Spinner />
            :<>
            <span>{children}</span>
            {HtmlArrow}
            </>
          }
      </button>
    )
  }
}

export default CustomButton