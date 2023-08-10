'use client'
import React, { useEffect, useState } from 'react'

import Sidebar from '@/components/my-account/Sidebar'

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

const MyAccount = () => {
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
                </ul>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <h1 className='heading mb-5 sm-grey'>My Details</h1>
                <form className="mt-8 mb-2 w-full max-w-[600px]">
                  <div className="grid md:grid-cols-12  gap-6">
                    <div className='md:col-span-6'>
                      <Input size="lg" className='md:col-span-6' label="First Name" />
                    </div>
                    <div className='md:col-span-6'>
                      <Input size="lg" className='md:col-span-6' label="Last Name" />
                    </div>
                    <div className='md:col-span-12'>
                      <Input size="lg" className='md:col-span-6' label="Phone" />
                    </div>
                    <div className='md:col-span-12'>
                      <Input size="lg" className='md:col-span-6' label="Email" />
                    </div>
                    <div className="md:col-span-12">
                      <Checkbox
                        label={
                          (
                            <Typography
                              variant="small"
                              color="gray"
                              className="flex items-center font-normal"
                            >
                              I agree the
                              <a
                                href="#"
                                className="font-medium transition-colors hover:text-blue-500"
                              >
                                &nbsp;Terms and Conditions
                              </a>
                            </Typography>
                          )
                        }
                        containerProps={{ className: "-ml-2.5" }}
                      />
                      <button className='main-btn dark full mt-5'>
                        <span>Save Details</span>
                      </button>
                    </div>
                  </div>
                </form>
              </CardBody>
            </Card>
          </div>
        </main>
      </div>
    </div>



  )
}

export default MyAccount