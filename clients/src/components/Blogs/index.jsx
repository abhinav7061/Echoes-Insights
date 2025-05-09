import React from 'react';
import useInfiniteApi from '../../hooks/useInfiniteApi';
import { BlogCards } from '../BlogCards';
import BlogItemSkeletonloading from '../SkeletonLoader.js/BlogItemSkeletonloading';
import { cn } from '../../lib/utils';

const Blogs = ({ endPoint, emptyScreen = null, shortFetch = false, heading = '', className }) => {
    const perPage = 8;

    const {
        data: blogs,
        loading,
        error,
        loaderRef,
        hasMore
    } = useInfiniteApi(endPoint, null, { params: { limit: perPage } });
    if (!blogs.length && !loading) return emptyScreen;
    return (
        <div className={cn('mb-4 z-10', className)}>
            {heading && <h1 className="text-xl sm:text-2xl font-bold mb-4">{heading}</h1>}
            <div className={cn('gap-3 w-full relative',
                shortFetch ? 'flex overflow-x-scroll overflow-y-hidden w-full scrollbar-none' : 'grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
            )}>
                <BlogCards cards={blogs} />
                {loading && Array.from({ length: perPage }).map((_, index) => (
                    <BlogItemSkeletonloading key={index} />
                ))}
            </div>
            {error && <p className="text-red-500">Something went wrong while loading history.</p>}
            {hasMore && !shortFetch && <div ref={loaderRef} className="h-1" />}
        </div >
    );
}

export default Blogs