'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Avatar,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

import Invoice from './Invoice';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Link from 'next/link';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import QtyCounter from './QtyCounter';
import api from '@/api/api';
import CloseIcon from '@mui/icons-material/Close';

import deleteIcon from '@/images/delete.svg'

import eye from '@/images/eye.svg'
import upload from '@/images/upload-icon.svg'

import CancelIcon from '@mui/icons-material/Cancel';

import customToast from '@/utils/CusToast';
import { useSelector } from 'react-redux';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { ToastContainer } from 'react-toastify';

const OrderCard = ({ handleRemoveCart, data, cartId, orderId, fetchOrder }) => {
    const [size, setSize] = useState(null);
    const [size2, setSize2] = useState(null);
    const handleOpen = (value) => setSize(value);
    const handleOpen2 = (value) => setSize2(value);
    const [isMobile, setIsMobile] = useState(false);
    const [isLens, setIsLens] = useState(false);
    const [initValues, setInitValues] = useState({});
    const userdata = useSelector((state) => state.userData.value);
    const [pdTotal, setPdTotal] = useState(0);

    useEffect(() => {
        if (data?.productdetails?.categoryid == 4 || data?.productdetails?.categoryid == 3) {
            setIsLens(true)
        }
    }, [data])

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

    const [tab, setTab] = useState(2);

    const tabChange = (tb) => {
        setTab(tb)
    }

    const handleCLick = (e) => {
        // const vl = e.target.dataset.value;
        // dispatch(updateProductAdd({...productData, prescription: vl}))
    }

    

    const handleUploadLater = () => {
        const uploadManually = () => {
            formik.handleSubmit()
        }

        const uploadFile = async () => {
            if (selectedFile) {
                const formData = new FormData();
                formData.append('file', selectedFile);
                formData.append('cartid', cartId);
                formData.append('orderid', orderId);
                const res = await api.post(`upload-prescription?auth=${userdata.access_token}`, formData);
                const dt = res.data;
                if (dt.status) {
                    customToast('Your prescription has been successfully uploaded');
                    fetchOrder();
                    setSize2('');
                }
            }
        }

        if (tab == 1) {
            uploadManually();
        } else {
            uploadFile();
        }
    }

    const [selectedFile, setSelectedFile] = useState(null);
    const [fileError, setFileError] = useState('');

    // Function to handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(null);
        if (!file) {
            setFileError('Please select a file.');
            return;
        }
        if (
            file.type !== 'application/pdf' &&
            !file.name.endsWith('.doc') &&
            !file.name.endsWith('.docx')
        ) {
            setFileError('Please select a PDF or Word document file.');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setFileError('File size exceeds 5 MB limit.');
            return;
        }
        setFileError('')
        setSelectedFile(file);
    };


    // const validationSchema = Yup.object({
    //     rightEye: Yup.object({
    //       rsd: Yup.number(),
    //       rcd: Yup.number(),
    //       rad: Yup.number(),
    //       rsn: Yup.number(),
    //       rcn: Yup.number(),
    //       ran: Yup.number(),
    //     }),
    //     leftEye: Yup.object({
    //     lsd: Yup.number(),
    //     lcd: Yup.number(),
    //     lad: Yup.number(),
    //     lsn: Yup.number(),
    //     lcn: Yup.number(),
    //     lan: Yup.number(),
    //     }),
    //   });

    const validationSchema = Yup.object({
        rightEye: Yup.object({
            rsd: Yup.string().required(),
            rcd: Yup.string().required(),
            rad: Yup.string().required(),
            rsn: Yup.string().required(),
            rcn: Yup.string().required(),
            ran: Yup.string().required(),
        }),
        leftEye: Yup.object({
            lsd: Yup.string().required(),
            lcd: Yup.string().required(),
            lad: Yup.string().required(),
            lsn: Yup.string().required(),
            lcn: Yup.string().required(),
            lan: Yup.string().required(),
        }),
        pd: Yup.object({
            pdLeft: Yup.number().required().max(180),
            pdRight: Yup.number().required().max(180),
            pdTotal: Yup.number().required().max(360),
        }),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initValues,
        validationSchema,
        onSubmit: async (values) => {
            const formData = new FormData();
            const obj = { ...values.rightEye, ...values.leftEye, ...values.pd };
            Object.keys(obj).forEach((key) => {
                formData.append(key, obj[key]);
            });
            formData.append('cartid', cartId);
            formData.append('orderid', orderId);
            const res = await api.post(`upload-prescription?auth=${userdata.access_token}`, formData);
            const data = res.data;
            if (data.status) {
                customToast('Your prescription has been successfully uploaded');
                fetchOrder();
                setSize2('');
            }

        },
    });

    useEffect(() => {
        if (data.prescription.status) {
            const isReadOnly = !formik.values.isReadOnly;
            formik.setValues({ ...formik.values, isReadOnly });
            console.log('file', data.prescription.file);
            console.log('file');
            if (data.prescription.file) {
                setTab(2);
                setSelectedFile(data.prescription.file)
            } else {
                setTab(1);
                setInitValues(data.prescription.jsondta)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    const Powers = [
        '-0.2',
        '-0.1',
        '0',
        '0.1',
        '0.2'
    ]
    const Spherical = [
        '-10.00', '-9.75', '-9.50', '-9.25', '-9.00', '-8.75', '-8.50', '-8.25', '-8.00', '-7.75',
        '-7.50', '-7.25', '-7.00', '-6.75', '-6.50', '-6.25', '-6.00', '-5.75', '-5.50', '-5.25',
        '-5.00', '-4.75', '-4.50', '-4.25', '-4.00', '-3.75', '-3.50', '-3.25', '-3.00', '-2.75',
        '-2.50', '-2.25', '-2.00', '-1.75', '-1.50', '-1.25', '-1.00', '-0.75', '-0.50', '-0.25',
        '0.00', '+0.25', '+0.50', '+0.75', '+1.00', '+1.25', '+1.50', '+1.75', '+2.00', '+2.25',
        '+2.50', '+2.75', '+3.00', '+3.25', '+3.50', '+3.75', '+4.00'
    ]
    const cylinderical = [
        '-6.00', '-5.75', '-5.50', '-5.25', '-5.00', '-4.75', '-4.50', '-4.25', '-4.00', '-3.75',
        '-3.50', '-3.25', '-3.00', '-2.75', '-2.50', '-2.25', '-2.00', '-1.75', '-1.50', '-1.25',
        '-1.00', '-0.75', '-0.50', '-0.25', '0.00', '+0.25', '+0.50', '+0.75', '+1.00', '+1.25',
        '+1.50', '+1.75', '+2.00', '+2.25', '+2.50', '+2.75', '+3.00', '+3.25', '+3.50', '+3.75',
        '+4.00', '+4.25', '+4.50', '+4.75', '+5.00', '+5.25', '+5.50', '+5.75', '+6.00'
    ]



    return (
        <>
            <ToastContainer />
            <div className='cart-item flex gap-5'>
                <div className="cart-img">
                    <Image src={data?.productdetails.image} width={160} height={160} alt="" />
                </div>
                <div className="cart-det flex flex-col justify-between items-end w-full">
                    <div className='flex items-start h-full justify-between w-full'>
                        <div>
                            <h3>{data?.productdetails.product_name}</h3>
                            <p className="price mb-2">₹ {data?.subtotal}</p>

                            {
                                isLens ?
                                    <>
                                        <table className='c-table mt-5 re-f-table'>
                                            <tbody>
                                                {
                                                    data?.qty > 0 && isLens &&
                                                    <tr >
                                                        <td>
                                                            <label><b>R</b></label>
                                                        </td>
                                                        <td>
                                                            <span>{data?.powerRight}</span>
                                                        </td>
                                                        <td>
                                                            <span>{data?.qty}</span>
                                                        </td>
                                                    </tr>
                                                }
                                                {
                                                    isLens && data?.qty2 > 0 &&
                                                    <tr >
                                                        <td>
                                                            <label htmlFor=""><b>L</b></label>
                                                        </td>
                                                        <td>
                                                            <span>{data?.powerLeft}</span>
                                                        </td>
                                                        <td>
                                                            <span>{data?.qty2}</span>
                                                        </td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </> :
                                    <p className="">Qty <b>{data?.qty}</b> | Lens type <b>{data?.lenstype || 'none'}</b> | Lens Package <b>{data?.lenspackage || 'none'} X ₹ {data?.lensprice || 0}</b></p>
                            }
                            {/* <p className='mt-2'>
                                {
                                    data?.productdetails.attributes &&
                                    data?.productdetails.attributes?.map((item, index) => (
                                        <span key={index}>{item.key}: {item.value} • </span>
                                    ))
                                }
                            </p> */}
                            {
                                data?.productdetails.categoryid == 1 &&
                                <>
                                    {data?.prescription?.status ?
                                        <div className="flex items-center gap-2 error-code-bar success mt-2">
                                            {/* <ErrorOutlineIcon /> */}
                                            <span>Your order will be delivered soon</span>
                                        </div>
                                        : <div className="flex items-center gap-2 error-code-bar mt-2">
                                            <ErrorOutlineIcon />
                                            <span>Please upload your lens details</span>
                                        </div>}
                                </>

                            }

                        </div>
                        <div className='flex flex-col items-end h-full justify-between'>
                            {/* <Popover placement="bottom-end">
                                <PopoverHandler>
                                    <button className="more-order-opt">
                                        <MoreHorizIcon />
                                    </button>
                                </PopoverHandler>
                                <PopoverContent className="p-2 z-50">
                                    <List className="p-0">
                                        <button className="text-initial" >
                                            <ListItem>
                                               
                                                View Invoice
                                            </ListItem>
                                        </button>
                                        <button className="text-initial" onClick={() => handleOpen("sm")}>
                                            <ListItem>
                                                
                                                View Order Details
                                            </ListItem>
                                        </button>
                                    </List>
                                </PopoverContent>
                            </Popover> */}
                            {
                                data?.productdetails.categoryid == 1 &&
                                <div className="flex items-center gap-2">
                                    <button className="main-btn mt-2 min-w-[max-content]" onClick={() => handleOpen2("lg")} >
                                        <span className='text-sm/[14px]'>{data?.prescription?.status ? 'View Prescription' : 'Select Lens Power'}</span>
                                    </button>
                                </div>
                            }
                            {/* <button className='delete-btn' type="button" onClick={(e) => handleRemoveCart(data?.cartid)}>
                                <span>Remove</span>
                                <Image src={deleteIcon} alt="" />
                            </button> */}
                        </div>
                    </div>
                </div>

            </div>
            <Dialog
                open={
                    size === "xs" ||
                    size === "sm" ||
                    size === "md" ||
                    size === "lg" ||
                    size === "xl" ||
                    size === "xxl"
                }
                size={isMobile ? 'xl' : size || "md"}
                handler={handleOpen}
            >
                <DialogHeader>
                    <div className="flex items-center justify-between w-full gap-5 flex-wrap">
                        <h2 className='head sm'>Product Name</h2>
                        <button className='modal-close-btn' onClick={() => handleOpen("close")}>
                            <CloseIcon />
                        </button>
                    </div>
                </DialogHeader>
                <DialogBody className='p-8 rounded-xl'>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                        {/* <div className="relative">
                <Image src={LoginImg} width={600} height={600} className='w-full h-full object-cover object-center rounded-xl' />
              </div> */}
                        <div className="relative">

                        </div>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <button className="main-btn">
                        <span>Apply</span>
                    </button>
                </DialogFooter>
            </Dialog>

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
                    <div className='r-part '>
                        <h3 className="sm-head">
                            What About My Eye Power?
                        </h3>
                        {
                            data?.prescription?.status ? '' :
                                <ul className="radio-tabs mb-8 pb-5">
                                    <li>
                                        <button data-value="2" className={`${tab == 2 ? 'active' : ''}`} onClick={(e) => { tabChange(2); handleCLick(e) }}>
                                            <span>upload prescription</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button data-value="3" className={`${tab == 1 ? 'active' : ''}`} onClick={(e) => { tabChange(1); handleCLick(e) }}>
                                            <span>Enter Manually</span>
                                        </button>
                                    </li>
                                </ul>
                        }
                        <div className={`tab-content ${data?.prescription?.status ? 'mt-8' : ''}`}>
                            {
                                tab == 1 ?
                                    <div className="tab-content-inner">
                                        {/* <form > */}
                                        <div className="re-le-wrapper">
                                            <div className="re-part">
                                                {/* Right Eye */}
                                                <div className="flex items-center gap-2 e-wr">
                                                    <Image src={eye} alt="" width={30} height={30} />
                                                    <span>Right Eye</span>
                                                </div>

                                                <div className="opt-table mt-3">
                                                    <div className="op-row">
                                                        <div className="op-cell"></div>
                                                        <div className="op-cell">
                                                            <p>Sph</p>
                                                        </div>
                                                        <div className="op-cell">
                                                            <p>Cyl</p>
                                                        </div>
                                                        <div className="op-cell">
                                                            <p>Axis</p>
                                                        </div>
                                                    </div>
                                                    {
                                                        [{ name: 'd', label: 'D.V' }, { name: 'n', label: 'N.V' }].map((item, i) => (
                                                            <div className="op-row" key={i}>
                                                                <div className="op-cell">
                                                                    <p>{item.label}</p>
                                                                </div>
                                                                {
                                                                    ['s', 'c', 'a'].map((field, index) => (
                                                                        <div className="op-cell" key={index}>
                                                                            {/* <input
                                                                                    type="text"
                                                                                    name={`rightEye.${'r'+field+item.name}`}
                                                                                    onChange={formik.handleChange}
                                                                                    onBlur={formik.handleBlur}
                                                                                    value={formik.values.rightEye && formik.values.rightEye[`${'r'+field+item.name}`]}
                                                                                    className={formik.errors.rightEye ?formik.touched?.rightEye && formik.errors?.rightEye[`${'r'+field+item.name}`]&&'error':''}
                                                                                />
                                                                                */}
                                                                            {/* {
                                                                                    formik.errors.rightEye && formik.errors?.rightEye[`${'r'+field+item.name}`]
                                                                                } */}
                                                                            {
                                                                                data?.prescription?.status ?

                                                                                    <select readOnly name={`rightEye.${'r' + field + item.name}`} id="" value={formik.values.rightEye && formik.values.rightEye[`${'r' + field + item.name}`]}
                                                                                    >
                                                                                        <option value=""></option>
                                                                                        {
                                                                                            Spherical.map((e,index) => {
                                                                                                return (
                                                                                                    <option key={index} value={e}>{e}</option>
                                                                                                )
                                                                                            })
                                                                                        }
                                                                                    </select> :
                                                                                    <select name={`rightEye.${'r' + field + item.name}`} id="" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rightEye && formik.values.rightEye[`${'r' + field + item.name}`]}
                                                                                        className={formik.errors.rightEye ? formik.errors?.rightEye[`${'r' + field + item.name}`] && 'error' : ''}>
                                                                                        <option selected value=""></option>
                                                                                        {
                                                                                            Spherical.map((e,index) => {
                                                                                                return (
                                                                                                    <option key={index} value={e}>{e}</option>
                                                                                                )
                                                                                            })
                                                                                        }
                                                                                    </select>

                                                                            }
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                            <div className="le-part">
                                                {/* Left Eye */}
                                                <div className="flex items-center gap-2 e-wr">
                                                    <Image src={eye} alt="" width={30} height={30} />
                                                    <span>Left Eye</span>
                                                </div>
                                                <div className="opt-table mt-3">
                                                    <div className="op-row">
                                                        <div className="op-cell"></div>
                                                        <div className="op-cell">
                                                            <p>Sph</p>
                                                        </div>
                                                        <div className="op-cell">
                                                            <p>Cyl</p>
                                                        </div>
                                                        <div className="op-cell">
                                                            <p>Axis</p>
                                                        </div>
                                                    </div>
                                                    {
                                                        [{ name: 'd', label: 'D.V' }, { name: 'n', label: 'N.V' }].map((item, i) => (
                                                            <div className="op-row" key={i}>
                                                                <div className="op-cell">
                                                                    <p>{item.label}</p>
                                                                </div>
                                                                {
                                                                    ['s', 'c', 'a'].map((field, index) => (
                                                                        <div className="op-cell" key={index}>
                                                                            {/* <input
                                                                                    type="text"
                                                                                    name={`leftEye.${'l'+field+item.name}`}
                                                                                    onChange={formik.handleChange}
                                                                                    onBlur={formik.handleBlur}
                                                                                    value={formik.values.leftEye && formik.values.leftEye[`${'l'+field+item.name}`]}
                                                                                    className={formik.errors.leftEye ? formik.touched.leftEye && formik.errors.leftEye[`${'l'+field+item.name}`]&&'error':''}
                                                                                /> */}
                                                                            {
                                                                                !data?.prescription?.status ?

                                                                                    <select name={`leftEye.${'l' + field + item.name}`}
                                                                                        onChange={formik.handleChange}
                                                                                        onBlur={formik.handleBlur}
                                                                                        value={formik.values.leftEye && formik.values.leftEye[`${'l' + field + item.name}`]}
                                                                                        className={formik.errors.leftEye ? formik.errors.leftEye[`${'l' + field + item.name}`] && 'error' : ''}>
                                                                                        <option selected value=""></option>
                                                                                        {
                                                                                            Powers.map((e,index) => {
                                                                                                return (
                                                                                                    <option key={index} value={e}>{e}</option>
                                                                                                )
                                                                                            })
                                                                                        }
                                                                                    </select> :
                                                                                    <select readOnly name={`leftEye.${'l' + field + item.name}`}

                                                                                        value={formik.values.leftEye && formik.values.leftEye[`${'l' + field + item.name}`]}
                                                                                    >
                                                                                        <option value=""></option>
                                                                                        {
                                                                                            Powers.map((e,index) => {
                                                                                                return (
                                                                                                    <option key={index} value={e}>{e}</option>
                                                                                                )
                                                                                            })
                                                                                        }
                                                                                    </select>

                                                                            }
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        {/* {formik.touched.rightEye && formik.errors.rightEye && (
                                                <div className="act-msg error"></div>
                                            )} */}
                                        {/* <button type="submit">Submit</button> */}
                                        {/* </form> */}
                                        <div className="pd-inp-container mt-5">
                                            <label htmlFor="" className="label-text">PD</label>
                                            <div className="opt-table pd-table">
                                                <div className="op-row">
                                                    <div className="op-cell">
                                                        Left
                                                    </div>
                                                    <div className="op-cell">
                                                        Right
                                                    </div>
                                                    <div className="op-cell">
                                                        Total
                                                    </div>
                                                </div>
                                                <div className="op-row">
                                          
                                                    <div className="op-cell">
                                                        {
                                                            data?.prescription?.status ?
                                                            <input type="text" name={`pd.pdLeft`} readOnly value={formik.values.pd && formik.values?.pd[`pdLeft`]} />:
                                                            <input name={`pd.pdLeft`} 
                                                            onChange={(e) => {
                                                                const newValue = parseInt(e.target.value) || 0;
                                                                if (!isNaN(newValue)) {
                                                                    // const adjustedValue = newValue > 60 ? 60 : newValue;
                                                                    // const otherValue = newValue > 60 ? 0 : 60 - adjustedValue;
                                                                    // const total = parseInt(otherValue) + parseInt(adjustedValue);
                                                                    // formik.setValues({
                                                                    //     ...formik.values,
                                                                    //     pd: {
                                                                    //         pdLeft: adjustedValue.toString(),
                                                                    //         pdRight: otherValue.toString(),
                                                                    //         pdTotal: total.toString()
                                                                    //     }
                                                                    // });
                                                                    
                                                                    formik.setValues({
                                                                        ...formik.values,
                                                                        pd: {
                                                                            ...formik.values.pd,
                                                                            pdLeft: newValue,
                                                                            pdTotal: formik.values?.pd && parseInt(formik.values?.pd['pdRight']) + newValue
                                                                        }
                                                                    });
                                                                }
                                                            }}
                                                            onBlur={formik.handleBlur} value={formik.values.pd && formik.values.pd[`pdLeft`]}
                                                            className={formik.errors.pd ? formik.errors?.pd[`pdLeft`] && 'error' : ''} />
                                                        }
                                                    </div>
                                                    <div className="op-cell">
                                                        {
                                                            data?.prescription?.status ?
                                                            <input name={`pd.pdRight`} type="text" readOnly value={formik.values.pd && formik.values?.pd[`pdRight`]} />:
                                                            <input name={`pd.pdRight`} 
                                                            onChange={(e) => {
                                                                const newValue = parseInt(e.target.value) || 0;
                                                                if (!isNaN(newValue)) {
                                                                    // const adjustedValue = newValue > 60 ? 60 : newValue;
                                                                    // const otherValue = newValue > 60 ? 0 : 60 - adjustedValue;
                                                                    // const total = parseInt(otherValue) + parseInt(adjustedValue);
                                                                    
                                                                    // formik.setValues({
                                                                    //     ...formik.values,
                                                                    //     pd: {
                                                                    //         pdLeft: otherValue.toString(),
                                                                    //         pdRight: adjustedValue.toString(),
                                                                    //         pdTotal: total.toString()
                                                                    //     }
                                                                    // });
                                                                 
                                                                    formik.setValues({
                                                                        ...formik.values,
                                                                        pd: {
                                                                            ...formik.values.pd,
                                                                            pdRight: newValue,
                                                                            pdTotal: formik.values?.pd && parseInt(formik.values?.pd['pdLeft']) + newValue
                                                                        }
                                                                    });
                                                                }
                                                            }}
                                                            onBlur={formik.handleBlur} value={formik.values.pd && formik.values.pd[`pdRight`]}
                                                            className={formik.errors.pd ? formik.errors?.pd[`pdRight`] && 'error' : ''} />
                                                        }
                                                    </div>
                                                    <div className="op-cell">
                                                 
                                                            <input type="text" name={`pd.pdTotal`} readOnly value={formik.values.pd && formik.values.pd[`pdTotal`]} className={formik.errors.pd ? formik.errors?.pd[`pdTotal`] && 'error' : ''} />:
                                                           
                                                    </div>
                                                       
                                                        {/* {
                                                            [...Array(3)].map((e,index)=>{
                                                                index = index+1
                                                                return(
                                                                    <div className="op-cell" key={index}>
                                                                      
                                                                    {
                                                                    data?.prescription?.status ?
                                                                    <select readOnly name={`pd.pd${index}`} id="" value={formik.values.pd && formik.values?.pd[`pd${index}`]}
                                                                    >
                                                                        <option value=""></option>
                                                                        {
                                                                            Powers.map((e,index) => {
                                                                                return (
                                                                                    <option key={index} value={e}>{e}</option>
                                                                                )
                                                                            })
                                                                        }
                                                                    </select> :
                                                                    <select name={`pd.pd${index}`} id="" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.pd && formik.values.pd[`pd${index}`]}
                                                                        className={formik.errors.pd ? formik.errors?.pd[`pd${index}`] && 'error' : ''}>
                                                                        <option selected value=""></option>
                                                                        {
                                                                            Powers.map((e, index) => {
                                                                                return (
                                                                                    <option key={index} value={e}>{e}</option>
                                                                                )
                                                                            })
                                                                        }
                                                                    </select>
                                                                    }
                                                                </div>
                                                                )  
                                                            })
                                                        } */}
                                                    
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        <p className="sm-text mt-8">
                                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut similique sunt ipsum vero vel mollitia deserunt, maiores nobis hic voluptatem numquam dolore soluta, in iure, perspiciatis unde. Quis, amet optio!
                                        </p>
                                    </div> : tab == 2 ?
                                        <div className="tab-content-inner">
                                            {
                                                data?.prescription?.status ?
                                                    <>
                                                        <Link href={selectedFile && selectedFile.url} target="_blank" download className='selected-file center'>
                                                            <div>
                                                                <p>{selectedFile && selectedFile.name}</p>
                                                            </div>

                                                        </Link>
                                                    </> :
                                                    <>
                                                        <label for="file1" className="big-upload-btn" >
                                                            <input
                                                                type="file"
                                                                accept=".jpg, .jpeg, .png, .pdf"
                                                                onChange={handleFileChange}
                                                                style={{ display: 'none' }}
                                                                id="file1"
                                                            />
                                                            <Image src={upload} alt="" />
                                                            <span>Upload Your Prescription</span>
                                                        </label>
                                                        <p className="sm-text text-center mt-2 mb-3">Note : Document should be in PDF* format under 5MiB</p>
                                                        {
                                                            fileError != '' &&
                                                            <div className='act-msg error center'>
                                                                <p>
                                                                    {fileError}
                                                                </p>
                                                            </div>
                                                        }
                                                        {
                                                            selectedFile &&
                                                            <div className='selected-file center'>
                                                                <div>
                                                                    <p>{selectedFile.name}</p>
                                                                </div>
                                                                <button className='remove-file' onClick={() => setSelectedFile(null)}>
                                                                    <CancelIcon />
                                                                </button>
                                                            </div>
                                                        }
                                                    </>
                                            }
                                        </div> :
                                        <div className="tab-content-inner">
                                            <ul className="le-points">
                                                <li>
                                                    You can submit your eye power after Payment step
                                                </li>
                                            </ul>
                                            <div className="hw-steps grid mt-8 grid-cols-1 md:grid-cols-2 gap-3">
                                                <div className="hw-step">
                                                    <h3>Step 1</h3>

                                                    <div className="hw-step-img">

                                                    </div>
                                                    <p className="para">
                                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, veniam nam ipsam pariatur dolor amet id non qui libero accusantium
                                                    </p>
                                                </div>
                                                <div className="hw-step">
                                                    <h3>Step 1</h3>

                                                    <div className="hw-step-img">

                                                    </div>
                                                    <p className="para">
                                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, veniam nam ipsam pariatur dolor amet id non qui libero accusantium
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                            }
                        </div>
                    </div>
                </DialogBody>
                {
                    data?.prescription?.status ? '' :
                        <DialogFooter>
                            <div className="btn-flex flex gap-3 ">
                                <button type="submit" className="main-btn" onClick={handleUploadLater}>
                                    <span>Submit</span>
                                </button>
                            </div>
                        </DialogFooter>
                }
            </Dialog>


            {/* <Dialog
                open={
                size2 === "xs" ||
                size2 === "sm" ||
                size2 === "md" ||
                size2 === "lg" ||
                size2 === "xl" ||
                size2 === "xxl"
                }
                size={isMobile ? 'xl' : invoiceModal || "md"}
                handler={handleInvoiceModal}
            >
                
                <DialogBody className='h-[80vh] overflow-scroll rounded-xl' divider >
                <button className='modal-close-btn' onClick={() => handleInvoiceModal("close")}>
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
            </Dialog> */}
        </>
    )
}

export default OrderCard