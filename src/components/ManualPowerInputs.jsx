'use client'
import React, {useEffect,useState} from 'react'
import eye from '@/images/eye.svg'
import Image from 'next/image'

const ManualPowerInputs = ({data,formik}) => {
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
    const axisDegrees = Array.from({ length: 181 }, (_, i) => `${i}°`);
    return (
        <>
            <div className="re-le-wrapper">
                <div className="re-part">

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
                                        ['s', 'c', 'a'].map((field, index) => {
                                            let pws = [];
                                            switch (field) {
                                                case 's':
                                                    pws = Spherical;
                                                    break;
                                                case 'c':
                                                    pws = cylinderical;
                                                    break;
                                                case 'a':
                                                    pws = axisDegrees;
                                                    break;
                                                
                                                default:
                                                    break;
                                            }
                                            return(
                                            <div className="op-cell" key={index}>

                                                {
                                                    data?.prescription?.status ?

                                                        <select readOnly name={`rightEye.${'r' + field + item.name}`} id="" value={formik.values.rightEye && formik.values.rightEye[`${'r' + field + item.name}`]}
                                                        >
                                                            <option value=""></option>
                                                            {
                                                               
                                                                pws.map((e, index) => {
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
                                                                pws.map((e, index) => {
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
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="le-part">

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
                                        ['s', 'c', 'a'].map((field, index) => {
                                            let pws = [];
                                            switch (field) {
                                                case 's':
                                                    pws = Spherical;
                                                    break;
                                                case 'c':
                                                    pws = cylinderical;
                                                    break;
                                                case 'a':
                                                    pws = axisDegrees;
                                                    break;
                                                
                                                default:
                                                    break;
                                            }
                                            return(
                                            <div className="op-cell" key={index}>

                                                {
                                                    !data?.prescription?.status ?

                                                        <select name={`leftEye.${'l' + field + item.name}`}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.leftEye && formik.values.leftEye[`${'l' + field + item.name}`]}
                                                            className={formik.errors.leftEye ? formik.errors.leftEye[`${'l' + field + item.name}`] && 'error' : ''}>
                                                            <option selected value=""></option>
                                                            {
                                                                pws.map((e, index) => {
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
                                                                pws.map((e, index) => {
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
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
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
                                    <input type="text" name={`pd.pd1`} readOnly value={formik.values.pd && formik.values?.pd[`pd1`]} /> :
                                    <input name={`pd.pd1`}
                                        onChange={(e) => {
                                            const newValue = parseInt(e.target.value) || 0;
                                            if (!isNaN(newValue)) {

                                                formik.setValues({
                                                    ...formik.values,
                                                    pd: {
                                                        ...formik.values.pd,
                                                        pd1: newValue,
                                                        pd3: formik.values?.pd && parseInt(formik.values?.pd['pd2']) + newValue
                                                    }
                                                });
                                            }
                                        }}
                                        onBlur={formik.handleBlur} value={formik.values.pd && formik.values.pd[`pd1`]}
                                        className={formik.errors.pd ? formik.errors?.pd[`pd1`] && 'error' : ''} />
                            }
                        </div>
                        <div className="op-cell">
                            {
                                data?.prescription?.status ?
                                    <input name={`pd.p2`} type="text" readOnly value={formik.values.pd && formik.values?.pd[`p2`]} /> :
                                    <input name={`pd.p2`}
                                        onChange={(e) => {
                                            const newValue = parseInt(e.target.value) || 0;
                                            if (!isNaN(newValue)) {


                                                formik.setValues({
                                                    ...formik.values,
                                                    pd: {
                                                        ...formik.values.pd,
                                                        pd2: newValue,
                                                        pd3: formik.values?.pd && parseInt(formik.values?.pd['pd1']) + newValue
                                                    }
                                                });
                                            }
                                        }}
                                        onBlur={formik.handleBlur} value={formik.values.pd && formik.values.pd[`p2`]}
                                        className={formik.errors.pd ? formik.errors?.pd[`p2`] && 'error' : ''} />
                            }
                        </div>
                        <div className="op-cell">

                            <input type="text" name={`pd.pd3`} readOnly value={formik.values.pd && formik.values.pd[`pd3`]} className={formik.errors.pd ? formik.errors?.pd[`pd3`] && 'error' : ''} />:

                        </div>



                    </div>
                </div>
            </div>
        </>
    )
}

export default ManualPowerInputs