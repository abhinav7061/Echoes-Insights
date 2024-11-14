import React from 'react'

const BlogItemSkeletonloading = ({ id }) => {
    return (
        <div className={`flex flex-col overflow-hidden rounded-xl border dark:border-slate-800 animate-pulse`} key={id}>
            <SkeletonDiv className='w-full h-[100px] md:h-[150px] border-b dark:border-gray-700' />
            <div className="flex flex-col flex-grow p-4 feature-card dark:feature-card">
                <SkeletonDiv className='w-full h-4 rounded-md mb-3' />
                <div className='flex justify-between md:mb-1'>
                    <SkeletonDiv className='w-1/4 h-2 rounded-md' />
                    <SkeletonDiv className='w-1/4 h-2 rounded-md' />
                    <SkeletonDiv className='w-1/4 h-2 rounded-md' />
                </div>
                <div className='py-3 space-y-2'>
                    <SkeletonDiv className='w-full h-3 rounded-md' />
                    <SkeletonDiv className='w-2/3 h-3 rounded-md' />
                </div>
                <SkeletonDiv className='mt-2 h-6 w-2/5 rounded-lg' />
            </div>
        </div>
    )
}

export default BlogItemSkeletonloading

const SkeletonDiv = ({ className, children }) => {
    return <div className={`bg-slate-50 dark:bg-slate-600 ${className}`}>{children}</div>
}