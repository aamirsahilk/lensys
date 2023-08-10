'use client'
import React, { useEffect, useState } from 'react'

import Sidebar from '@/components/my-account/Sidebar'
import CartItem from '@/components/CartItem';

import Pagination from '@/components/Pagination';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography 
} from "@material-tailwind/react";

const Orders = () => {

    const [itemOffset, setItemOffset] = useState(0);
    var items = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
    const itemsPerPage = 5;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);
  
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      setItemOffset(newOffset);
    };

    useEffect(()=>{
        console.log("pages", itemOffset);
    }, [itemOffset])

  return (

    <div className='my-acc-page md:grid md:grid-cols-12'>
      <div className="md:col-span-3">
        <Sidebar />
      </div>
      <div className="md:col-span-9">
        <main className='myacc-container'>
          <div className="acc-content-wrap my-acc-page-content p-5">
            <Card className='mb-5'>
              <CardBody>
                <ul className="bread-crumbs">
                  <li>
                    <h1 className="heading">My Account</h1>
                  </li>
                  <li>
                    <h1 className="heading">My Orders</h1>
                  </li>
                </ul>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="my-orders-list max-w-[800px] mb-5">
                    <CartItem fullDet={true} />
                </div>
                <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
              </CardBody>
            </Card>
          </div>
        </main>
      </div>
    </div>



  )
}

export default Orders