import React, {useState, useEffect} from 'react'

const QtyCounter = ({counter,handleCounter}) => {
  return (
    <div className='counter-wrapper mt-3'>
        <button data-action="dec" onClick={(e)=>handleCounter(e)}>
            <span>-</span>
        </button>
        <input type="text" value={counter} />
        <button data-action="inc" onClick={(e)=>handleCounter(e)}>
            <span>+</span>
        </button>
    </div>
  )
}

export default QtyCounter