'use client'
import React, { useEffect, useState } from 'react'

import Sidebar from '@/components/my-account/Sidebar'
import customToast from '@/utils/CusToast';

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

import api from '@/api/api';

import {useSelector, useDispatch} from 'react-redux';
import { updateUserData } from '@/store/features/userdata/UserDataSlice';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const MyAccount = () => {

  const [passType, setPassType] = useState(true);
  const [passType2, setPassType2] = useState(true);

  const user = useSelector(state=>state.userData.value);
  const dispatch = useDispatch();
  
  const userData = user;

  useEffect(() =>{
    console.log('userdata', userData)
  }, [userData])

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('First Name is required'),
    lastname: Yup.string().required('Last Name is required'),
    phone: Yup.string().required('Phone is required'),
    email: Yup.string().email('Invalid email').required('Email is required')
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
    name: userData?.name || '',
    lastname: userData?.lastname || '',
    phone: userData?.phone || '',
    email: userData?.email || '',
  }


  const initialValuesForPasswords = {
    newPassword: '',
    confirmPassword : ''
  };

  const handleSubmit = async (values, {setSubmitting}) => {
    // console.log('values', values);
    // return 
    var formData = new FormData();
    var obj = {}
    Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
        obj = {...obj, ...{[key]:values[key]}}
    });
    const res = await api.post(`update-profile?auth=${userData.access_token}`, formData);
    const data = res.data;
    if(data.status){
      dispatch(updateUserData({...user, ...{profile: obj}}))
      customToast('Details updated successfully');
      setTimeout(()=>{
        setSubmitting(false);
      }, 1500)
    }
  };


  const handleSubmitForPassword = async (values, {resetForm }) => {
    var formData = new FormData();
    formData.append('password', values.newPassword);
    const res = await api.post(`update-password?auth=${userData.access_token}`, formData);
    const data = res.data;
    if(data.status){
      resetForm();
      customToast('Password has been changes successfully');
      // setTimeout(()=>{
      //   setSubmitting(false);
      // }, 1500)
    }
  };

  return (

    
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
                    enableReinitialize
                  >
                    {({isSubmitting })=>(
                      <Form className="mt-8 mb-2 w-full max-w-[600px]">
                        <div className="grid md:grid-cols-12 gap-6">
                          <div className="md:col-span-6">
                            <div className="form-group">
                              <label htmlFor="firstName">First Name</label>
                              <div className="inp-grp">
                                <Field type="text" id="name" name="name" />
                              </div>
                              <ErrorMessage name="name" component="div" className="error-message" />
                            </div>
                          </div>
                          <div className="md:col-span-6">
                            <div className="form-group">
                              <label htmlFor="lastName">Last Name</label>
                              <div className="inp-grp">
                                <Field type="text" id="lastname" name="lastname" />
                              </div>
                              <ErrorMessage name="lastname" component="div" className="error-message" />
                            </div>
                          </div>
                          <div className="md:col-span-12">
                            <div className="form-group">
                              <label htmlFor="phone">Phone</label>
                              <div className="inp-grp">
                                <Field type="text" id="phone" name="phone" readOnly />
                              </div>
                              <ErrorMessage name="phone" component="div" className="error-message" />
                            </div>
                          </div>
                          <div className="md:col-span-12">
                            <div className="form-group">
                              <label htmlFor="email">Email</label>
                              <div className="inp-grp">
                                <Field type="email" id="email" name="email" readOnly />
                              </div>
                              <ErrorMessage name="email" component="div" className="error-message" />
                            </div>
                          </div>
                          <div className="md:col-span-12">
                            <button type="submit" className="main-btn dark full mt-5" disabled={isSubmitting}> 
                              <span>{isSubmitting?'Please Wait...':'Save Details'}</span>
                            </button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
                <div className="relative">
                  <h1 className='heading mb-5 sm-grey'>Change Password</h1>
                  <Formik
                    initialValues={initialValuesForPasswords}
                    validationSchema={validationSchemaForPasswords}
                    onSubmit={handleSubmitForPassword}
                  >
                    {({resetForm})=>(
                      <Form className="mt-8 mb-2 w-full max-w-[600px]">
                        <div className="grid md:grid-cols-12 gap-6">
                          <div className="md:col-span-12">
                            <div className="form-group">
                              <label htmlFor="password">New Password</label>
                              <div className="inp-grp">
                                <div className="pass-input">
                                  <Field type={passType ? 'password' : 'text'} name="newPassword" />
                                  <button type="button" className="pass-ico" onClick={() => setPassType((preState) => !preState)}>
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
                                  <button type="button" className="pass-ico" onClick={() => setPassType2((preState) => !preState)}>
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
                    )}
                  </Formik>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </main>

  )
}

export default MyAccount