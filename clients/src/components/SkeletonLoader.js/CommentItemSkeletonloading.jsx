import React from 'react'
import SkeletonDiv from '.'

const CommentItemSkeletonloading = () => {
    return (
        <div className='w-full flex gap-3 animate-pulse'>
            <SkeletonDiv className='h-7 w-7 rounded-full' />
            <div className='w-full'>
                <div className='flex gap-2 items-center '>
                    <SkeletonDiv className='w-1/6 h-1.5 xs:h-2 rounded-md' />
                    <SkeletonDiv className='w-1 h-1 rounded-full' />
                    <SkeletonDiv className='w-1/6 h-1.5 xs:h-2 rounded-md' />
                    <SkeletonDiv className='w-5 h-5  rounded-full flex items-center justify-center ml-auto'>
                        <ion-icon name="ellipsis-horizontal"></ion-icon>
                    </SkeletonDiv>
                </div>
                <SkeletonDiv className='h-2 xs:h-2.5 w-full' />
                <SkeletonDiv className='h-2 xs:h-2.5 w-full' />
                <SkeletonDiv className='h-2 xs:h-2.5 w-3/5' />
            </div>
        </div>
    )
}

export default CommentItemSkeletonloading