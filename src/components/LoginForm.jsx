'use client'
import React, {useEffect, useState} from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import api from '@/api/api';
import { useSelector } from 'react-redux';

const LoginForm = (props) => {
    const [passType, setPassType] = useState(true);
    const {loginSubmit} = props;
    const [forgot, setForgot] = useState(false);
    const [forgotStatus, setForgotStatus] = useState({});

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required').matches(
            /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
            'Password must contain at least 1 letter, 1 number, 1 symbol, and be 8 characters long'
        )
    });
    const userdata = useSelector((state)=> state.userData.value );
    const validationSchema2 = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required')
    });

    const handleForgotPass = async (values)=>{
        console.log('hkkh', values);
        const data = new FormData();
        data.append('email', values.email);
        const res = await api.post(`forgot-password`, data);
        const dt = res.data;
        setForgotStatus({...dt,message:"We've sent an password change email, Check your email id "});
        // setTimeout(() => {
        //     setForgotStatus({});
        // }, 2500);
    }

    return (
        <>
        {
            !forgot?
            <Formik
                initialValues={{
                    email: 'behlah13@gmail.com',
                    password: 'behlah@123',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    loginSubmit(values)
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="col-span-4">
                                <div className="form-group">
                                    <label htmlFor="" className="label-text">Email Address</label>
                                    <div className="inp-grp">
                                        <Field type="text" name="email" placeholder="eg:1234568790" />
                                        <ErrorMessage name="email" component="div" className="error-message" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-4">
                                <div className="form-group">
                                    <label htmlFor="" className="label-text">Password</label>
                                    <div className="inp-grp">
                                        <div className="pass-input">
                                            <Field type={passType ? 'password' : 'text'} name="password" />
                                            <button type="button" className="pass-ico" onClick={() => setPassType((prevState) => !prevState)}>
                                                {!passType ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </button>
                                        </div>
                                        <ErrorMessage name="password" component="div" className="error-message" />
                                    </div>
                                </div>
                                <button type="button" className='forgot-pass-btn' onClick={()=>setForgot(true)}>Forgot Password?</button>
                            </div>
                        </div>
                        <button className="main-btn full dark mt-8" type="submit">
                            <span>Login</span>
                        </button>
                    </Form>
                )}
            </Formik>:
            <Formik
            initialValues={{
                email: '',
            }}
            validationSchema={validationSchema2}
            onSubmit={handleForgotPass}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-4">
                            
                            <div className="form-group">
                                <label htmlFor="" className="label-text">Email Address</label>
                                <div className="inp-grp">
                                    <Field type="text" name="email" placeholder="eg:1234568790" />
                                    <ErrorMessage name="email" component="div" className="error-message" />
                                </div>
                            </div>
                            <button type="button" className='forgot-pass-btn' onClick={()=>setForgot(false)}>Back</button>
                            {
                                Object.keys(forgotStatus).length != 0 &&
                                <div className={`act-msg ${forgotStatus.status?'suc':'error'}`}>
                                    <p>{forgotStatus.message}</p>
                                </div>
                            }
                            
                        </div>
                    </div>
                    <button className="main-btn full dark mt-8" type="submit">
                        <span>Send Email</span>
                    </button>
                </Form>
            )}
        </Formik>
        }
        </>
    )
}

export default LoginForm