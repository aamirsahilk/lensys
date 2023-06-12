import React from 'react'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

const Ratings = ({rating}) => {
  return (
    <div className='rating-container'>
        {
            [...Array(5)].map((item, index)=>{
                if(rating <= index){
                    return(
                        <div className='rating-star'>
                            <StarBorderIcon />
                        </div>
                    )
                }else{
                    return(
                        <div className='rating-star'>
                            <StarIcon />
                        </div>
                    )
                }
            })
        }
    </div>
  )
}

export default Ratings