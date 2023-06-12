import React from 'react'

const Productlikebtn = ({liked, setLiked}) => {
  var cs  = `le_pr-like-btn ${liked?'liked':''}`  
  return (
    <button className={cs} onClick={()=>setLiked(!liked)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" fill="none" viewBox="0 0 39 39">
            <g opacity=".65">
                <circle cx="19.5" cy="19.5" r="19" fill="#fff" fill-opacity=".25" stroke="#000"/>
                <path stroke="#292D32" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M20.05 27.309a1.932 1.932 0 0 1-1.1 0c-2.57-.878-8.314-4.538-8.314-10.743 0-2.739 2.207-4.955 4.929-4.955 1.613 0 3.04.78 3.935 1.986a4.901 4.901 0 0 1 3.935-1.986c2.722 0 4.929 2.216 4.929 4.955 0 6.205-5.744 9.865-8.315 10.743Z"/>
            </g>
        </svg>
    </button>
  )
}

export default Productlikebtn