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

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const MyAccount = () => {

  const [passType, setPassType] = useState(true);
  const [passType2, setPassType2] = useState(true);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    phone: Yup.string().required('Phone is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    agreeToTerms: Yup.bool().oneOf([true], 'You must agree to the Terms and Conditions'),
  });

  const validationSchemaForPasswords = Yup.object().shape({
    newPassword: Yup.string()
    .required('New Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
      'Password must contain at least 1 letter, 1 number, 1 symbol, and be 8 characters long'
  ),
    confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });
  

  const initialValues = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    agreeToTerms: false,
  };

  const initialValuesForPasswords = {
    newPassword: '',
    confirmPassword : ''
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  const handleSubmitForPassword = (values) => {
    console.log(values);
  };

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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
                  <div className="relative">
                    <h1 className='heading mb-5 sm-grey'>My Details</h1>
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      <Form className="mt-8 mb-2 w-full max-w-[600px]">
                        <div className="grid md:grid-cols-12 gap-6">
                          <div className="md:col-span-6">
                            <div className="form-group">
                              <label htmlFor="firstName">First Name</label>
                              <div className="inp-grp">
                                <Field type="text" id="firstName" name="firstName" />
                              </div>
                              <ErrorMessage name="firstName" component="div" className="error-message" />
                            </div>
                          </div>
                          <div className="md:col-span-6">
                            <div className="form-group">
                              <label htmlFor="lastName">Last Name</label>
                              <div className="inp-grp">
                                <Field type="text" id="lastName" name="lastName" />
                              </div>
                              <ErrorMessage name="lastName" component="div" className="error-message" />
                            </div>
                          </div>
                          <div className="md:col-span-12">
                            <div className="form-group">
                              <label htmlFor="phone">Phone</label>
                              <div className="inp-grp">
                                <Field type="text" id="phone" name="phone" />
                              </div>
                              <ErrorMessage name="phone" component="div" className="error-message" />
                            </div>
                          </div>
                          <div className="md:col-span-12">
                            <div className="form-group">
                              <label htmlFor="email">Email</label>
                              <div className="inp-grp">
                                <Field type="email" id="email" name="email" />
                              </div>
                              <ErrorMessage name="email" component="div" className="error-message" />
                            </div>
                          </div>
                          <div className="md:col-span-12">
                            <div className="cus-checkbox-wrapper">
                              <Field type="checkbox" name="agreeToTerms" id="agree" />
                              <label htmlFor='agree'>
                                <span>
                                  I agree to the
                                  <a href="#" className="font-medium transition-colors hover:text-blue-500">
                                    &nbsp;Terms and Conditions
                                  </a>
                                </span>
                              </label>
                            </div>
                            <ErrorMessage name="agreeToTerms" component="div" className="error-message" />
                          </div>
                          <div className="md:col-span-12">
                            <button type="submit" className="main-btn dark full mt-5">
                              <span>Save Details</span>
                            </button>
                          </div>
                        </div>
                      </Form>
                    </Formik>
                  </div>
                  <div className="relative">
                    <h1 className='heading mb-5 sm-grey'>Change Password</h1>
                    <Formik
                      initialValues={initialValuesForPasswords}
                      validationSchema={validationSchemaForPasswords}
                      onSubmit={handleSubmitForPassword}
                    >
                      <Form className="mt-8 mb-2 w-full max-w-[600px]">
                        <div className="grid md:grid-cols-12 gap-6">
                          <div className="md:col-span-12">
                            <div className="form-group">
                              <label htmlFor="password">New Password</label>
                              <div className="inp-grp">
                                <div className="pass-input">
                                  <Field type={passType ? 'password' : 'text'} name="newPassword" />
                                  <button className="pass-ico" onClick={() => setPassType((preState) => !preState)}>
                                    {!passType ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                  </button>
                                </div>
                              </div>
                              <ErrorMessage name="newPassword" component="div" className="error-message" />
                            </div>
                          </div>
                          <div className="md:col-span-12">
                            <div className="form-group">
                              <label htmlFor="password">Confirm Password</label>
                              <div className="inp-grp">
                                <div className="pass-input">
                                  <Field type={passType2 ? 'password' : 'text'} name="confirmPassword" />
                                  <button className="pass-ico" onClick={() => setPassType2((preState) => !preState)}>
                                    {!passType2 ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                  </button>
                                </div>
                              </div>
                              <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                            </div>
                          </div>
                          <div className="md:col-span-12">
                            <button type="submit" className="main-btn dark full mt-5">
                              <span>Change Password</span>
                            </button>
                          </div>
                        </div>
                      </Form>
                    </Formik>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </main>
      </div>
    </div>



  )
}

export default MyAccount