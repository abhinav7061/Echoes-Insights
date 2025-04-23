import SkeletonDiv from '.'

const BlogItemSkeletonloading = ({ id }) => {
    return (
        <div className="flex flex-col overflow-hidden rounded-xl animate-pulse xs:shadow-lg dark:shadow-neutral-950 xs:border dark:border-neutral-700 min-w-[200px]" key={id}>
            <SkeletonDiv className='w-full h-[100px] md:h-[150px] border-b dark:border-gray-700 mb-0' style={{ marginBottom: 0 }} />
            <div className="flex flex-col flex-grow xs:px-4 py-1 xs:dark:bg-neutral-800 mb-0">
                <div className='flex gap-2 items-center'>
                    <SkeletonDiv className='w-3.5 xs:w-5 h-3.5 xs:h-5 rounded-full' />
                    <SkeletonDiv className='w-2/6 h-1.5 xs:h-2 rounded-md' />
                    <SkeletonDiv className='w-1 h-1 rounded-full' />
                    <SkeletonDiv className='w-1/6 h-1.5 xs:h-2 rounded-md' />
                </div>
                <SkeletonDiv className='w-full h-3.5 xs:h-5 rounded-md' />
                <SkeletonDiv className='w-full h-2 xs:h-3 rounded-md' />
                <SkeletonDiv className='w-2/3 h-2 xs:h-3 rounded-md' />
                <div className="flex justify-between">
                    <SkeletonDiv className='h-3.5 xs:h-5 w-2/5 rounded-lg' />
                    <SkeletonDiv className='h-3.5 xs:h-5 w-2/5 rounded-lg' />
                </div>
            </div>
        </div>
    )
}

export default BlogItemSkeletonloading