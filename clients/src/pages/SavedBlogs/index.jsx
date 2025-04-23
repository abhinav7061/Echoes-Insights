import React from 'react';
import { BlogCards } from '../../components/BlogCards';
import BlogItemSkeletonloading from '../../components/SkeletonLoader.js/BlogItemSkeletonloading';
import useInfiniteApi from '../../hooks/useInfiniteApi';
import NoSavedBlogs from '../../components/EmptyState/NoSavedBlogs';


const SavedBlogs = () => {
    const {
        data: blogs,
        loading,
        error,
        loaderRef,
        hasMore,
    } = useInfiniteApi('/save-blog/saved-blogs-summary', null, { params: { limit: 8 } });

    if (!blogs?.length) return <NoSavedBlogs />

    return (
        <div className='w-full'>
            <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[2px] xs:gap-1.5 sm:gap-3'>
                <BlogCards cards={blogs} />
                {loading &&
                    Array.from({ length: 8 }).map((_, i) => (
                        <BlogItemSkeletonloading key={i} />
                    ))}
            </div>

            {hasMore && <div ref={loaderRef} className='h-[1px]' />}
            {error && <p className="text-red-500">Error loading saved blogs.</p>}
        </div>
    );
};

export default SavedBlogs;
