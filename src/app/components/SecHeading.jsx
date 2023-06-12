import React from 'react'

const SecHeading = ({children, centerLine}) => {
  return (
    <div className={`sec-head ${centerLine?'centerLine':''}`}>
        <h2>{children}</h2>
    </div>
  )
}

export default SecHeading