'use client'
import React, { useState, useEffect, useCallback } from 'react'
import Sidebar from '@/components/my-account/Sidebar';

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

  import api from '@/api/api';

import OrderCard from '@/components/OrderCard';



const SingleOrder = ({params}) => {
    const orderId = params.order;
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState({});

    const fetchOrder = useCallback(async() => {
        const res = await api.get('order-details/'+orderId);
        const data = res.data;
        setOrders(data.order_items || []);
        setOrder(data || {});
    }, [])

    useEffect(() => {
        fetchOrder()
    },[fetchOrder]);

    return (
        <div>
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
                                        <li>
                                            <h1 className="heading">{orderId}</h1>
                                        </li>
                                    </ul>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody> 
                                    <div className="grid md:grid-cols-12 grid-cols-1 gap-5">
                                        <div className="my-orders-list md:col-span-8  mb-5">
                                            <h3 className="heading sm mb-3">
                                                Your Items
                                            </h3>
                                            {
                                                orders?.map((item,index)=>(
                                                    <OrderCard key={index} data={item} />
                                                ))
                                            }
                                        </div>  
                                        <div className="relative md:col-span-4">
                                            <table className="c-table">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            Order Total
                                                        </td>  
                                                        <td>
                                                            {order?.order_total}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Shipping Charge
                                                        </td>  
                                                        <td>
                                                            {order?.shippingcharge}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Discount
                                                        </td>  
                                                        <td>
                                                            {order?.discount_amount}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <b>Total Amount</b>
                                                        </td>  
                                                        <td>
                                                            <b>{order?.total_amount}</b>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <h3 className="heading sm mt-5 mb-3">Payment Details</h3>
                                            <table className="c-table">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            Payment ID
                                                        </td>  
                                                        <td>
                                                            {order?.payment_id}
                                                        </td>
                                                    </tr>
                                                    {
                                                        order?.payment_date &&
                                                        <tr>
                                                            <td>
                                                                Date & Time
                                                            </td>  
                                                            <td>
                                                                {order?.payment_date}
                                                            </td>
                                                        </tr>
                                                    }
                                                    <tr>
                                                        <td>
                                                            Status
                                                        </td>  
                                                        <td>
                                                            <span className={`status ${order?.payment_status}`}>
                                                                {order?.payment_status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    
                                                    <tr>
                                                        <td>
                                                            <b>Total Paid</b>
                                                        </td>  
                                                        <td>
                                                            <b>{order?.total_paid_amount || '-'}</b>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default SingleOrder