import React, {useState, useEffect} from 'react'

const QtyCounter = ({counter,handleCounter, cartId, isLens}) => {
  return (
    <div className='counter-wrapper mt-3'>
        <button data-action="dec" type="button" onClick={(e)=>handleCounter(e,counter, cartId, isLens)}>
            <span>-</span>
        </button>
        <input type="text" value={counter} />
        <button data-action="inc" type="button" onClick={(e)=>handleCounter(e,counter, cartId, isLens)}>
            <span>+</span>
        </button>
    </div>
  )
}

export default QtyCounter