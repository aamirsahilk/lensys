import React, {useEffect, useState} from 'react'
import Select from 'react-select'

const ContactLensPowerSelect = ({setLensObj}) => {
    
    const rightEyeQty = [
        { value: 'none', label: 'Select Qnty', name: 'qty' },
        { value: '0', label: '0', name: 'qty' },
        { value: '1', label: '1', name: 'qty' },
        { value: '2', label: '2', name: 'qty' }
    ]
    const leftEyeQty = [
        { value: 'none', label: 'Select Qnty', name: 'qty2' },
        { value: '1', label: '1', name: 'qty2' },
        { value: '2', label: '2', name: 'qty2' }
    ]
    const leftPower = [
        { value: 'none', label: 'Select Power', name: 'powerLeft' },
        { value: '0.2', label: '0.2', name: 'powerLeft' },
        { value: '0.3', label: '0.3', name: 'powerLeft' }
    ]
    const rightPower = [
        { value: 'none', label: 'Select Power', name: 'powerRight' },
        { value: '0.1', label: '0.1', name: 'powerRight' },
        { value: '0.2', label: '0.2', name: 'powerRight' },
        { value: '0.3', label: '0.3', name: 'powerRight' }
    ]
    const colourStyles = {
        control: styles => ({ ...styles, backgroundColor: 'white' }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = 'transparent';
            return {
            ...styles,
            backgroundColor: isDisabled ? 'red' : 'grey',
            color: '#FFF',
            cursor: isDisabled ? 'not-allowed' : 'default',
            };
        },
    };
    const handleChange = (e)=>{
        if(e.value == 'none'){
            setLensObj((prevState) => {
                const { [e.name]: removedProp, ...rest } = prevState;
                return rest;
            });
        }else{
            setLensObj(state=> ({...state, [e.name]:e.value}))
        }
    }
  return (
    <div className='mt-5 mb-5'>
        <div className="select-lens-power-wrap">
            <table className="c-table responsive-table contact-eye-power-table">
                <thead>
                    <tr>
                        <th>
                           
                        </th>
                        <th>
                            OS (LEFT EYE)
                        </th>
                        <th>
                            OS (RIGHT EYE)
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td data-value="">
                            Boxes
                        </td>
                        <td data-value="OS (LEFT EYE)">
                            <Select options={leftEyeQty} styles={colourStyles} onChange={handleChange} />
                        </td>
                        <td data-value="OS (RIGHT EYE)">
                            <Select options={rightEyeQty} styles={colourStyles} onChange={handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Sph
                        </td>
                        <td data-value="OS (LEFT EYE)">
                            <Select options={leftPower} styles={colourStyles} onChange={handleChange} />
                        </td>
                        <td data-value="OS (RIGHT EYE)"> 
                            <Select options={rightPower} styles={colourStyles} onChange={handleChange} />
                        </td>
                    </tr>
                </tbody>
            </table>
           
        </div>
    </div>
  )
}

export default ContactLensPowerSelect