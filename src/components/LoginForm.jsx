'use client'
import React, {useEffect, useState} from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


const LoginForm = (props) => {
    const [passType, setPassType] = useState(true);
    const {loginSubmit} = props;
    
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required').matches(
            /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
            'Password must contain at least 1 letter, 1 number, 1 symbol, and be 8 characters long'
        )
    });

    return (
        <Formik
            initialValues={{
                email: 'taha.h5363@gmail.com',
                password: 'taha@123',
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
                                        <button className="pass-ico" onClick={() => setPassType((prevState) => !prevState)}>
                                            {!passType ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                        </button>
                                    </div>
                                    <ErrorMessage name="password" component="div" className="error-message" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="main-btn full dark mt-8" type="submit">
                        <span>Login</span>
                    </button>
                </Form>
            )}
        </Formik>
    )
}

export default LoginForm