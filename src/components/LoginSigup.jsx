import React, {useState} from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { updateData } from '../store/features/login/LoginSlice'

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

import CustomButton from './CustomButton';

import SecHeading from './SecHeading';

const LoginSigup = () => {
    const [passType, setPassType] = useState(true);

    const dispatch = useDispatch();

    const data = useSelector((state) => state.login.value);


    const email = data.email || "";
    const password = data.password || "";
    
    const handleInputChange = (e) => {
        const attr = e.target.getAttribute('name');
        const rData = {
            ...data,
            [attr]: e.target.value
        }
        dispatch(updateData(rData));
    };

    return (
        <Tabs id="custom-animation" value="login" className="lg-tabs">
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
                        <div className="relative text-left mb-8">
                            <h3 className="heading">Login</h3>
                            <p className="para">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </p>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="col-span-4">
                                <div className="form-group">
                                    <label htmlFor="" className="label-text">Email Address</label>
                                    <div className="inp-grp">

                                            <input type="text" value={email} name="email" onChange={handleInputChange} placeholder='eg:1234568790' />

                                    </div>
                                </div>
                            </div>
                            <div className="col-span-4">
                                <div className="form-group">
                                    <label htmlFor="" className="label-text">Password</label>
                                    <div className="inp-grp">
                                        <div className="pass-input">
                                            <input type={!passType?"text":"password"} value={password} name="password" onChange={handleInputChange}  />
                                            <button className="pass-ico" onClick={()=>setPassType((preState)=>!preState)}>
                                                {!passType?<VisibilityOffIcon />:<VisibilityIcon />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <CustomButton blockBtn={true} dark={true} big={false} cusClass="mt-8">
                            <span>Login</span>
                        </CustomButton>
                    </div>
                </TabPanel>
                <TabPanel value="signup">
                    <div className="lg-form-wrapper signup-form">
                        <div className="relative text-left mb-8">
                            <h3 className="heading">Signup</h3>
                            <p className="para">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </p>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="col-span-2">
                                <div className="form-group">
                                    <label htmlFor="" className="label-text">First Name</label>
                                    <div className="inp-grp">
                                        <input type="text" placeholder='eg:john' />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <div className="form-group">
                                    <label htmlFor="" className="label-text">Last Name</label>
                                    <div className="inp-grp">
                                        <input type="text" placeholder='eg:Michael' />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-4">
                                <div className="form-group">
                                    <label htmlFor="" className="label-text">Phone Number</label>
                                    <div className="inp-grp">
                                        <div className="verify-input">
                                            <input type="text" placeholder='eg:1234568790' />
                                            <CustomButton xs={true} cusClass="link-btn" >
                                                Verify
                                            </CustomButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-4">
                                <div className="form-group">
                                    <label htmlFor="" className="label-text">Email Address</label>
                                    <div className="inp-grp">
                                        <div className="verify-input">
                                            <input type="text" placeholder='eg:john@gmail.com' />
                                            <CustomButton  xs={true} cusClass="link-btn" >
                                                Verify
                                            </CustomButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <CustomButton blockBtn={true} dark={true} big={false} cusClass="mt-8">
                            <span>Login</span>
                        </CustomButton>
                    </div>
                </TabPanel>
            </TabsBody>
        </Tabs>
    )
}

export default LoginSigup