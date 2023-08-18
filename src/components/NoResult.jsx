import React from 'react'

const NoResult = ({message}) => {
  return (
    <div className='no-res-wrap'>
        <p>{message ? message : 'No Result Found'}</p>
    </div>
  )
}

export default NoResult