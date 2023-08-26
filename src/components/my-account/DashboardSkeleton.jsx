import React from 'react'

const DashboardSkeleton = () => {
  return (
    <div className="pl-5 pr-5">
        <div className='my-acc-page md:grid md:grid-cols-11 gap-5 pt-5 pb-5'>
            <div className="md:col-span-2">
                <div className="animate-pulse flex space-x-4 bg-gray-200 rounded-lg h-[100vh] pl-5 pr-5 pt-5 pb-5">
                    <div className="animate-pulse flex space-x-4 bg-gray-500 rounded-lg pt-8"></div>
                </div>
            </div>
            <div className='md:col-span-9'>
                <div className="animate-pulse flex space-x-4 bg-gray-200 rounded-lg h-full">
                <div class="rounded-full bg-slate-200 h-10 w-10"></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DashboardSkeleton