import React from 'react'

const CheckPincode = () => {
  return (
    <div className='checkpincode-wrapper mt-5'>
        <div className="form-group">
            <div className="input-grp">
                <input type="text" placeholder='Enter Pin code for Delivery' className="input-grp" />
            </div>
        </div>
        <button>CHECK</button>
    </div>
  )
}

export default CheckPincode