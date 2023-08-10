import React, {useEffect, useState} from 'react'
import Select from 'react-select'

const ContactLensPowerSelect = () => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
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
                            <Select options={options} styles={colourStyles} />
                        </td>
                        <td data-value="OS (RIGHT EYE)">
                            <Select options={options} styles={colourStyles} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Sph
                        </td>
                        <td data-value="OS (LEFT EYE)">
                            <Select options={options} styles={colourStyles} />
                        </td>
                        <td data-value="OS (RIGHT EYE)"> 
                            <Select options={options} styles={colourStyles} />
                        </td>
                    </tr>
                </tbody>
            </table>
           
        </div>
    </div>
  )
}

export default ContactLensPowerSelect