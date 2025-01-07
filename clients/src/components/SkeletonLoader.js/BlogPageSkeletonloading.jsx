import SkeletonDiv from ".";

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
                        <span>
                            <span className="flex">
                                <SkeletonDiv className='h-3 xs:h-4 w-4 ml-6 mr-2' />
                                <SkeletonDiv className='h-3 xs:h-4 w-14 xs:w-32' />
                            </span>
                            <span className="flex">
                                <SkeletonDiv className='h-3 xs:h-4 w-4 ml-6 mr-2' />
                                <SkeletonDiv className='h-3 xs:h-4 w-14 xs:w-32' />
                            </span>
                        </span>
                    </div>
                </div>
                <SkeletonDiv className='w-full rounded-2xl h-52 xs:h-80 mb-4 xs:mb-3' />
                <SkeletonDiv className='w-full rounded-lg h-20 xs:h-24 mb-4 xs:mb-6 px-5 py-1.5' >
                    <div className="absolute h-full w-1.5 left-0 top-0 bg-neutral-300 dark:bg-neutral-500" />
                    <h1 className='text-neutral-300 dark:text-neutral-500 text-xl font-bold mb-1.5' >Summary</h1>
                    <SkeletonDiv className='w-full h-2.5 bg-neutral-300 dark:bg-neutral-500' />
                    <SkeletonDiv className='w-full h-2.5 bg-neutral-300 dark:bg-neutral-500 hidden xs:block' />
                    <SkeletonDiv className='w-4/5 h-2.5 bg-neutral-300 dark:bg-neutral-500' />
                </SkeletonDiv>
                <div className="flex"><div className="w-24" /><SkeletonDiv className='h-3 xs:h-4 w-full ' /></div>
                <SkeletonDiv className='h-3 xs:h-4 w-full' />
                <SkeletonDiv className='h-3 xs:h-4 w-full' />
                <SkeletonDiv className='h-3 xs:h-4 w-1/3' />
                <div className="my-2 xs:my-3" />
                <div className="flex"><div className="w-24" /><SkeletonDiv className='h-3 xs:h-4 w-full' /></div>
                <SkeletonDiv className='h-3 xs:h-4 w-full' />
                <SkeletonDiv className='h-3 xs:h-4 w-full' />
                <SkeletonDiv className='h-3 xs:h-4 w-full' />
                <SkeletonDiv className='h-3 xs:h-4 w-3/5' />
            </div>
        </>
    );
};

export default BlogPageSkeletonloading;