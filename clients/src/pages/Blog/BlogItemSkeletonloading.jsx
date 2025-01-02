import React from 'react'

const BlogItemSkeletonloading = ({ id }) => {
    return (
        <div className="flex flex-col overflow-hidden rounded-xl animate-pulse shadow-lg dark:shadow-neutral-950 border dark:border-neutral-700" key={id}>
            <SkeletonDiv className='w-full h-[100px] md:h-[150px] border-b dark:border-gray-700' />
            <div className="flex flex-col flex-grow p-4 feature-card dark:feature-card dark:bg-neutral-800">
                <div className='flex gap-2 items-center mb-1'>
                    <SkeletonDiv className='w-5 h-5 rounded-full' />
                    <SkeletonDiv className='w-2/6 h-2 rounded-md' />
                    <SkeletonDiv className='w-1 h-1 rounded-full' />
                    <SkeletonDiv className='w-1/6 h-2 rounded-md' />
                </div>
                <SkeletonDiv className='w-full h-5 rounded-md' />
                <div className='my-3 space-y-2'>
                    <SkeletonDiv className='w-full h-3 rounded-md' />
                    <SkeletonDiv className='w-2/3 h-3 rounded-md' />
                </div>
                <div className="flex justify-between">
                    <SkeletonDiv className='h-6 w-2/5 rounded-lg' />
                    <SkeletonDiv className='h-6 w-2/5 rounded-lg' />
                </div>
            </div>
        </div>
    )
}

export default BlogItemSkeletonloading

const SkeletonDiv = ({ className, children }) => {
    return <div className={`bg-neutral-400 dark:bg-neutral-600 ${className}`}>{children}</div>
}