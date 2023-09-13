import React, {useEffect, useState} from 'react'
import Select from 'react-select'

const ContactLensPowerSelect = ({setLensObj}) => {
    
    const lensPower = (min,max,gap,name) =>{
        const arr = [];
        arr.push({ value: 'none', label: 'None', name: name })
        for (let i = min; i <= max; i += gap) {
            arr.push({value: '-'+i.toFixed(2), label:'-'+i.toFixed(2),name:name})
        }
        return arr;
    }
    const qntySelect = (min,max,gap,name) =>{
        const arr = [];
        arr.push({ value: 'none', label: 'None', name: name })
        for (let i = min; i <= max; i += gap) {
            arr.push({value: i.toFixed(0), label:i.toFixed(0)+' Box',name:name})
        }
        return arr;
    }
   
    const rightEyeQty = qntySelect(1,30,1,'qty')
    const leftEyeQty = qntySelect(1,30,1,'qty2')
    const leftPower = lensPower(0.50,12.00,0.25,'powerLeft')
    const rightPower = lensPower(0.50,12.00,0.25,'powerRight')
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
                            OS (RIGHT EYE)
                        </th>
                        <th>
                            OS (LEFT EYE)
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td data-value="">
                            Boxes
                        </td>
                        <td data-value="OS (RIGHT EYE)">
                            <Select options={rightEyeQty} styles={colourStyles} onChange={handleChange} />
                        </td>
                        <td data-value="OS (LEFT EYE)">
                            <Select options={leftEyeQty} styles={colourStyles} onChange={handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Sph
                        </td>
                        <td data-value="OS (RIGHT EYE)"> 
                            <Select options={rightPower} styles={colourStyles} onChange={handleChange} />
                        </td>
                        <td data-value="OS (LEFT EYE)">
                            <Select options={leftPower} styles={colourStyles} onChange={handleChange} />
                        </td>
                    </tr>
                </tbody>
            </table>
           
        </div>
    </div>
  )
}

export default ContactLensPowerSelect