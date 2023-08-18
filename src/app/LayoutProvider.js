'use client'
import React, {useState, useEffect} from 'react'
import { usePathname } from 'next/navigation';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

const LayoutProvider = ({children}) => {
    const [flag, setFlag] = useState(true);
    const pathname = usePathname();
    useEffect(() => {
        const path = pathname.split('/')[1]
        setFlag(path != "add-product")
    }, [pathname])
  return (
    <>
        {flag && <Header />}
        {children}
        {flag && <Footer />}
    </>
  )
}

export default LayoutProvider