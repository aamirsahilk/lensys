import React, { useState, useEffect, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { updateData } from '../store/features/login/LoginSlice'
import api from '@/api/api';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";

import ReCAPTCHA from "react-google-recaptcha";

import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Typography,
} from "@material-tailwind/react";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { updateUserData } from '@/store/features/userdata/UserDataSlice';

import mailIcon from '../../public/images/go-mail-icon.svg'

import CustomButton from './CustomButton';

import customToast from '@/utils/CusToast';
// import { ToastContainer } from 'react-toastify';

import LoginForm from './LoginForm';

import SecHeading from './SecHeading';
import Image from 'next/image';

import { GoogleAuthProvider,FacebookAuthProvider, signInWithPopup } from "firebase/auth";
const provider = new GoogleAuthProvider();
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase/config";


const LoginSigup = ({handleOpen}) => {
    const [passType, setPassType] = useState(true);
    const [passType2, setPassType2] = useState(true);
    const [register, setRegister] = useState({status:false});
    const [tab, setTab] = useState('login');
    const [loginEr, setLoginEr] = useState('');
    const dispatch = useDispatch();
    const toastOptions = { hideProgressBar: false, autoClose: 2000, type: 'success' };
    const recaptchaRef = useRef();

    // toasts
    // const customToast = (text = "toast text", status = "success")=>{
    //     toast(text, {...toastOptions,type: status})
    // }

    const data = useSelector((state) => state.login.value);
    const userData = useSelector((state) => state.userData.value);

    const email = data.email || "";
    const password = data.password || "";

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required').matches(
            /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
            'Password must contain at least 1 letter, 1 number, 1 symbol, and be 8 characters long'
        ),
        fname: Yup.string().required('First Name is required'),
        lname: Yup.string().required('Last Name is required'),
        phone: Yup.string().required('Phone Number is required').matches(
            /^[0-9]{10}$/,
            'Phone number must be 10 digits'
        ),
        confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required')
    });

    // register form
    const registerSubmit = async (values)=>{
        var formData = new FormData();
        Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
        });
        try{
            const res = await api.post('register', formData);
            // const res = await axios.post('https://techmatrick.com/lensys/register', formData )
            if(res.data.status){
                // setRegister(res.data);
                loginSubmit({email: values.email, password: values.password})
                // customToast('Hurray! you have been registered', 'success')
                
            }else{
                customToast(res.data.msg, 'error')
            }
        }catch(error){
            customToast('Something went wrong', 'error')
            console.log("error", error);
        }
        // recaptchaRef.current.execute();
    }   

    const loginSubmit = async (values)=>{
        var formData = new FormData();
        Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
        });
        try{
            const res = await api.post('login', formData);
            if(res.data.status){
                customToast('Logged In Successfully') 
                handleOpen('close');
            }else{
                setLoginEr('Bad credentials Please Try Again')
            }
            if(res.data.status){
                dispatch(updateUserData({...res.data, loggedin:true}));
                localStorage.setItem('access_token', res.data.access_token);
            }
        }catch(error){
            customToast('Something went wrong', 'error')
            handleOpen('close');
        }
    }

    const loginGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential ?.accessToken;
                const user = result.user;
                console.log('userData google', user);
                const socialLogin = async()=>{
                    const formData = new FormData();
                    formData.append('email', user.email);
                    formData.append('name', user.displayName);
                    formData.append('accessToken', user.accessToken);
                    formData.append('uid', user.uid);
                    const res = await api.post('social-signin', formData);
                    if(res.data.status){
                        customToast('Logged In Successfully') 
                        handleOpen('close');
                        dispatch(updateUserData({...res.data, loggedin:true}));
                        localStorage.setItem('access_token', res.data.access_token);
                    }else{
                        setLoginEr('Bad credentials Please Try Again')
                    }
                    
                }
                socialLogin();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                customToast('Something went wrong', 'error')
                // handleOpen('close');
            });
    }

    const logoutGoogle = () => {
        auth.signOut();
    };

    const onReCAPTCHAChange = (captchaCode) => {
        if(!captchaCode) {
          return;
        }
        alert(`Hey`);
        recaptchaRef.current.reset();
    }

    return (
        <>
            <ToastContainer />
            <Tabs id="custom-animation" value={tab} className="lg-tabs">
                <TabsHeader>
                    <Tab value="login">
                        Login
                    </Tab>
                    <Tab value="signup">
                        Signup
                    </Tab>
                </TabsHeader>
                <TabsBody
                    animate={{
                        initial: { y: 250 },
                        mount: { y: 0 },
                        unmount: { y: 250 },
                    }}
                >
                    <TabPanel value="login">
                        <div className="lg-form-wrapper login-form">
                            <div className="relative text-left mb-2 ">
                                {/* <h3 className="heading">Login</h3> */}
                                {/* <p className="para">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                </p> */}
                            </div>
                                {
                                    loginEr != '' &&
                                    <div className="error-code-bar mb-2">
                                        <span>{loginEr}</span>
                                    </div>
                                }
                                <LoginForm loginSubmit={loginSubmit} loginGoogle={loginGoogle} />
                        </div>
                    </TabPanel>
                    <TabPanel value="signup">
                        {
                            register.status ? <>
                                <div className="reg-success-wrap">
                                    <Image src={mailIcon} alt="mail" width={100} height={100} />
                                    <h2>{register.message || "helloe"}</h2>
                                    <p>{register.note || "note will come here"}</p>
                                </div>
                            </>: 
                            <div className="lg-form-wrapper signup-form">
                                <div className="relative text-left mb-2">
                                    {/* <h3 className="heading">Signup</h3> */}
                                    {/* <p className="para">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    </p> */}
                                </div>
                                <Formik
                                    initialValues={{
                                        fname: '',
                                        lname: '',
                                        phone: '',
                                        email: '',
                                        password: '',
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={(values,{setSubmitting}) => {
                                        registerSubmit(values).finally(() => {
                                            setSubmitting(false)
                                        });
                                    }}
                                >
                                    {({ isSubmitting }) => (
                                        <Form>
                                            <div className="grid grid-cols-4 gap-4">
                                                <div className="md:col-span-2 col-span-4">
                                                    <div className="form-group">
                                                        <label className="label-text" htmlFor="firstName">First Name</label>
                                                        <div className="inp-grp">
                                                            <Field type="text" name="fname" placeholder="eg: John" />
                                                        </div>
                                                        <ErrorMessage name="fname" component="div" className="error-message" />
                                                    </div>
                                                </div>
                                                <div className="md:col-span-2 col-span-4">
                                                    <div className="form-group">
                                                        <label className="label-text" htmlFor="lastName">Last Name</label>
                                                        <div className="inp-grp">
                                                            <Field type="text" name="lname" placeholder="eg: Michael" />
                                                        </div>
                                                        <ErrorMessage name="lname" component="div" className="error-message" />
                                                    </div>
                                                </div>
                                                <div className="md:col-span-2 col-span-4">
                                                    <div className="form-group">
                                                        <label className="label-text" htmlFor="phoneNumber">Phone Number</label>
                                                        <div className="inp-grp">
                                                            <Field type="text" name="phone" placeholder="eg: 1234568790" />
                                                        </div>
                                                        <ErrorMessage name="phone" component="div" className="error-message" />
                                                    </div>
                                                </div>
                                                <div className="md:col-span-2 col-span-4">
                                                    <div className="form-group">
                                                        <label className="label-text" htmlFor="email">Email Address</label>
                                                        <div className="inp-grp">
                                                            <Field type="text" name="email" placeholder="eg: john@gmail.com" />
                                                        </div>
                                                        <ErrorMessage name="email" component="div" className="error-message" />
                                                    </div>
                                                </div>
                                                <div className="col-span-4">
                                                    <div className="form-group">
                                                        <label className="label-text" htmlFor="password">Create Password</label>
                                                        <div className="inp-grp">
                                                            <div className="pass-input">
                                                                <Field type={passType ? 'password' : 'text'} name="password" />
                                                                <button className="pass-ico" onClick={() => setPassType((preState) => !preState)}>
                                                                    {!passType ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <ErrorMessage name="password" component="div" className="error-message" />
                                                    </div>
                                                </div>
                                                <div className="col-span-4">
                                                    <div className="form-group">
                                                        <label className="label-text" htmlFor="password">Confirm Password</label>
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
                                            </div>
                                            {/* <ReCAPTCHA ref={recaptchaRef}  sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY} onChange={onReCAPTCHAChange} /> */}
                                            <button className="main-btn full dark mt-8" type="submit" disabled={isSubmitting} >
                                                <span>{isSubmitting?'Please wait...':'Register'}</span>
                                            </button>
                                        </Form>
                                    )}
                                </Formik>
                                
                            </div>
                        }
                    </TabPanel>
                </TabsBody>
            </Tabs>
        </>
    )
}

export default LoginSigup