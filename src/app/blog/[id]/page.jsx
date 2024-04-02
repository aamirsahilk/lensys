'use client'
import React, {useState, useEffect, useCallback} from 'react'
import Image from 'next/image';
import api from '@/api/api';

const BlogPage = ({params}) => {
    const [data, setData] = useState(null)
    const slug = params.id;
   
    const fetchProduct = useCallback(async()=>{
        const response = await api.get(`blog/${slug}`);
        setData(response.data);
    },[slug])

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct])
  return (
    <div className='container mx-auto'>
        {
            data &&
            <div className="blog-main">
                <div className="sec-head">
                    <h2>
                    {data?.title}
                    </h2>
                </div>
                <div className="blog-img">
                    <Image src={data?.image} alt={''} width={1920} height={1080} />
                </div>
                <div className="blog-content-area">
                    <div dangerouslySetInnerHTML={{ __html: data?.content }} />
                </div>
            </div>
        }
        {/* {
            data &&
            JSON.stringify(data)
        } */}
    </div>
  )
}

export default BlogPage