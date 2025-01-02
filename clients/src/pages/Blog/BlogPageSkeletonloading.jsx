const BlogPageSkeletonloading = () => {
    return (
        <>
            <div className={`my-8 md:px-20 animate-pulse flex flex-col mt-10`}>
                <div className='flex flex-col items-center mb-6'>
                    <SkeletonDiv className={'h-8 w-full rounded-lg'} />
                    <div className="flex items-center mt-2">
                        <div className="flex flex-col items-center">
                            <SkeletonDiv className='h-6 w-24 xs:w-60' />
                            <SkeletonDiv className='h-3 w-14 xs:w-32' />
                        </div>
                        <SkeletonDiv className='h-4 w-4 ml-6 mr-2' />
                        <SkeletonDiv className='h-4 w-14 xs:w-32' />
                    </div>
                </div>
                <SkeletonDiv className='w-full rounded-2xl h-52 xs:h-80 mb-6' />
                <div className="flex"><div className="w-24" /><SkeletonDiv className='h-4 w-full ' /></div>
                <SkeletonDiv className='h-4 w-full' />
                <SkeletonDiv className='h-4 w-full' />
                <SkeletonDiv className='h-4 w-1/3' />
                <div className="my-3" />
                <div className="flex"><div className="w-24" /><SkeletonDiv className='h-4 w-full' /></div>
                <SkeletonDiv className='h-4 w-full' />
                <SkeletonDiv className='h-4 w-full' />
                <SkeletonDiv className='h-4 w-full' />
                <SkeletonDiv className='h-4 w-3/5' />
            </div>
        </>
    );
};

export default BlogPageSkeletonloading;

const SkeletonDiv = ({ className, children }) => {
    return <div className={`bg-neutral-400 dark:bg-neutral-600 my-1 rounded-md ${className}`}>{children}</div>
}