'use client'

import Sidebar from "@/components/my-account/Sidebar"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import DashboardSkeleton from "@/components/my-account/DashboardSkeleton"

export default function productStepsLayout({ children }) {

    const userData = useSelector(user=>user.userData.value)
    const isLoggedIn = userData.loggedin;
    const { push } = useRouter();
    useEffect(() =>{
        if(!isLoggedIn){
            push('/');
        }
    },[isLoggedIn])
    if(!isLoggedIn){
        return(
            <DashboardSkeleton />
        )
    }

    return (
        <div className='my-acc-page md:grid md:grid-cols-11'>
            <div className="md:col-span-2">
                <Sidebar />
            </div>
            <div className="md:col-span-9">
                {children}
            </div>
        </div>
    )
}
