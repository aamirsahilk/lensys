import React from 'react'

const ColorRadios = ({data}) => {
  return (
    <div className="color-radio-wrap">
        {
            data.map((item,index)=>(
                <div className="color-radio" key={index}>
                    <input type="radio" name='color' id={`c${index}`} />
                    <label htmlFor={`c${index}`}>
                        <span style={{'background': item.code}}></span>
                        <p>{item.label}</p>
                    </label>
                </div>
            ))
        }
    </div>
  )
}

export default ColorRadios