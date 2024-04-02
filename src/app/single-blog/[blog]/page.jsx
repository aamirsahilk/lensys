'use client'
import React, {useEffect, useState, useCallback} from 'react'

const SingleBlog = ({params}) => {
  return (
    <div>{`${params.blog}`}</div>
  )
}

export default SingleBlog