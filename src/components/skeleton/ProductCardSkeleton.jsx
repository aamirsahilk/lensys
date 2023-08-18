import React from 'react'

const ProductCardSkeleton = () => {
  return (
    <div>
        <div class="flex flex-col m-8 rounded shadow-md w-60 sm:w-80 animate-pulse h-96">
            <div class="h-48 rounded-t dark:bg-gray-700"></div>
            <div class="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-900">
                <div class="w-full h-6 rounded dark:bg-gray-700"></div>
                <div class="w-full h-6 rounded dark:bg-gray-700"></div>
                <div class="w-3/4 h-6 rounded dark:bg-gray-700"></div>
            </div>
        </div>
    </div>
  )
}

export default ProductCardSkeleton