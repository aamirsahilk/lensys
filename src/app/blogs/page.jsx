"use client"
import React, {useState, useEffect, useCallback} from 'react'

import api from '@/api/api';
import BlogCard from '@/components/BlogCard';
import ProductCardSkeleton from '@/components/skeleton/ProductCardSkeleton';

const page = () => {
    const [data, setData] = useState(null)

    useEffect(async() => {
        const response = await api.get(`blogs`);
        setData(response.data);
    }, [])
  return (
    <>
    <header className="inner-header">

            <div className="container mx-auto">
                <div className="row">
                    <div className="col-12">
                        <div className="banner-con">
                            <h1>
                                Blogs
                            </h1>
                        </div>
                    </div>
                </div>
            </div>  
    </header>
    <section className='sec blogs-sec'>
        <div className="container mx-auto">
           
            <div className="blog-grid">
                {
                    data ? data.map((item,index)=>{
                        return(
                            <BlogCard key={index} data={item} />
                            // <>
                            // {JSON.stringify(item)}
                            // </>
                        )
                    }):
                    
                    [...Array(8)].map((item,index)=><ProductCardSkeleton key={index} />)
                }
            </div>

        </div>
    </section>
    </>
  )
}

export default page