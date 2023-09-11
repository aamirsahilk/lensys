'use client'
import React, { useEffect, useState } from 'react'

import Sidebar from '@/components/my-account/Sidebar'
import CartItem from '@/components/CartItem';

import Pagination from '@/components/Pagination';

import OrderCard from '@/components/OrderCard';
import { useSelector } from 'react-redux';

import {
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
  Popover,
  PopoverHandler,
  PopoverContent,
  List,
  ListItem,
} from "@material-tailwind/react";

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CloseIcon from '@mui/icons-material/Close';

import Script from 'next/script';

import api from '@/api/api';

import Invoice from '@/components/Invoice';

import NoResult from '@/components/NoResult';

import Link from 'next/link';

const Orders = () => {

  const [size, setSize] = useState(null);
  const [size2, setSize2] = useState(null);
  const handleOpen = (value) => setSize(value);
  const handleOpen2 = (value) => setSize2(value);
  const [isMobile, setIsMobile] = useState(false);

  const [orders, setOrders] = useState([]);
  const userData = useSelector(state=>state.userData.value);

  useEffect(() => {
    const handleResize = () => {
      // Check the window width and set the class accordingly
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [itemOffset, setItemOffset] = useState(0);
  var items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
  const itemsPerPage = 5;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  const fetchOrders = async()=>{
    const res = await api.get(`orders?auth=${userData.access_token}`);
    const data = res.data;
    setOrders(data || [])
  }

  useEffect(() => {
    console.log("pages", itemOffset);
  }, [itemOffset])

  useEffect(() => {
    fetchOrders();
  }, [])

  const paymentProceed = async (id) => {
      const res = await api.get(`paymentprocess/${id}?auth=${userData.access_token}`);
      const data = res.data;
      if (data.status) {
        fetchOrders();
      }else{
          alert('Something went wrong!');
      }
  }
  const retryPayment = async (id) => {
    const response = await api.get(`retry-payment/${id}?auth=${userData.access_token}`);
    const data = await response.data;
    const options = {
        key: data.rkey,
        amount: data.amount,
        order_id: data.orderid,
        name: data.companyname,
        description: 'Test Payment',
        handler: (ress) => {
            if (ress) {
                paymentProceed(ress.razorpay_payment_id)
            }
        },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
};

  return (
    <>
      <Script id="razorpay-checkout-js" src="https://checkout.razorpay.com/v1/checkout.js" />
      
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
                  <table className='c-table mb-5'>
                    <thead>
                      <tr>
                        <th className='text-left'>
                          Order ID
                        </th>
                        <th className='text-left'>
                          Order Status
                        </th>
                        <th className='text-left'>
                          Order Date
                        </th>
                        <th className='text-left'>
                          Payment Status
                        </th>
                        <th className='text-center' colSpan={2}>
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        orders.length > 0 ? 
                        orders?.map((item,index)=>(
                          <tr key={index}>
                            <td>
                              <Link href="/my-account/orders/1">{item.order_id}</Link>
                            </td>
                            <td>
                              <span className={`status ${item.order_status}`}>
                                {item.order_status}
                              </span>
                            </td>
                            <td>
                              {item.order_created}
                            </td>
                            <td>
                              <span className={`status ${item.payment_status}`}>
                                {item.payment_status}
                              </span>
                            </td>
                            <td>
                              {
                                  item.payment_status == 'failed'?
                                  <>
                                    <button className="main-btn sm pay-now-btn" onClick={()=>retryPayment(item.order_id)}>
                                      <span>Pay Now</span>
                                    </button>
                                  </>:''
                                }
                            </td>
                            <td >
                              <div className="flex items-center gap-3">
                                
                                <Popover placement="bottom-end">
                                  <PopoverHandler>
                                    <button className="more-order-opt">
                                      <MoreHorizIcon />
                                    </button>
                                  </PopoverHandler>
                                  <PopoverContent className="p-2 z-50">
                                    <List className="p-0">
                                      <button className="text-initial" onClick={() => handleOpen2("lg")}>
                                        <ListItem>
                                          {/* <ListItemPrefix>
                                                            <InsertEmoticonIcon />
                                                        </ListItemPrefix> */}
                                          View Invoice
                                        </ListItem>
                                      </button>
                                      <Link href={`my-account/orders/${item.order_id}`} className="text-initial">
                                        <ListItem>
                                          {/* <ListItemPrefix>
                                                            <InsertEmoticonIcon />
                                                        </ListItemPrefix> */}
                                          View Order Details
                                        </ListItem>
                                      </Link>
                                    </List>
                                  </PopoverContent>
                                </Popover>
                                
                              </div>
                            </td>
                          
                          </tr>
                        )): <NoResult message="No Orders Found" />
                      }
                    </tbody>
                  </table>
                  
                  {/* <Pagination pageCount={pageCount} handlePageClick={handlePageClick} /> */}
                </CardBody>
              </Card>
            </div>
          </main>

      <Dialog
        open={
          size2 === "xs" ||
          size2 === "sm" ||
          size2 === "md" ||
          size2 === "lg" ||
          size2 === "xl" ||
          size2 === "xxl"
        }
        size={isMobile ? 'xl' : size2 || "md"}
        handler={handleOpen2}
      >
        {/* <DialogHeader>
                    <div className="flex items-center justify-between w-full gap-5 flex-wrap">
                        <h2 className='head sm'>Invoice</h2>
                       
                    </div>
                </DialogHeader> */}
        <DialogBody className='h-[80vh] overflow-scroll rounded-xl' divider >
          <button className='modal-close-btn' onClick={() => handleOpen2("close")}>
            <CloseIcon />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
            <div className="relative">
              <Invoice />
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <div className="btn-flex flex gap-3 ">
            <button className="main-btn secondary">
              <span>Print Invoice</span>
            </button>
            <button className="main-btn">
              <span>Download Invoice</span>
            </button>
          </div>
        </DialogFooter>
      </Dialog>
    </>



  )
}

export default Orders