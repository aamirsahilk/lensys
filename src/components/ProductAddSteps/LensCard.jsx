import React from 'react'

const LensCard = ({lensDetails}) => {
  return (
    <div className='lens-det-card '>
        <input type="radio" id={`n${lensDetails.id}`} name="lensType" />
        <label htmlFor={`n${lensDetails.id}`}>
            <div className="det">
                <h3 className='title'>{lensDetails.name}
                {lensDetails.offers?<><span className={`le_offer-tag ${lensDetails.offers.level}`}>{lensDetails.offers.label}</span></>:''}
                </h3>
                <p className='para'>
                
                    {
                        lensDetails.features.map((item,index)=>{
                            if(index < 3){
                                return (
                                    <div key={index}> 
                                        <span>{item}</span>
                                        {
                                            index < 2?<span>|</span>:''
                                        }
                                    </div>
                                )
                            }
                        })
                    }
                    <span className="view-more">+{lensDetails.features.length} More</span>
                </p>
                <p className="price">+ ₹{lensDetails.price}&nbsp; <span>(including tax)</span></p>
            </div>
        </label>
    </div>
  )
}

export default LensCard