"use client"
import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'

const BlogCard = ({data}) => {
  return (
    <article className='blog-card'>
        <div className="blog-img">
            {/* {JSON.stringify(data.image)} */}
            <Image src={data?.image} width={300} height={300} alt="" />
        </div>
        <div className="blog-det">
            <h3>{data?.title}</h3>
            <p className="para">
                {data?.description}
            </p>
            <Link href={`/blog/${data?.slug}`} className="main-btn">
                <span>Read More</span>
            </Link>
        </div>
    </article>
  )
}

export default BlogCard