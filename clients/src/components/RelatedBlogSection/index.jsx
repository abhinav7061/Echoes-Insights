import React from 'react'
import useBlogSummaries from '../../hooks/useBlogSummaries';
import { BlogCards } from '../BlogCards';
import BlogItemSkeletonloading from '../SkeletonLoader.js/BlogItemSkeletonloading';
import ErrorMessage from '../ErrorMessage';

const apiUrl = import.meta.env.VITE_API_URL;

const RelatedBlogSection = ({ className }) => {
    const { blogs, hasMore, loading, loaderDiv, perPage, resetBlogSummaries, errorMessage } = useBlogSummaries(`${apiUrl}/blog`); // later the url should be changed to get related blog
    if (errorMessage) {
        return <ErrorMessage heading='Unable to fetch blog' message={errorMessage} action={resetBlogSummaries} />
    }
    return (
        <div className='flex flex-col w-full sm:w-2/5 lg:w-1/4'>
            <h1 className='text-xl font-bold mb-3'>Related Blogs</h1>
            <div className={`grid grid-cols-1 gap-2 ${className}`}>
                <BlogCards cards={blogs} />
                {loading && Array.from({ length: perPage }).map((_, index) => <BlogItemSkeletonloading key={index} />)}
            </div>
            {!hasMore && <div className='w-full text-center dark:text-white font-bold text-3xl my-5'>You have reached to end</div>}
            <div ref={loaderDiv} />
        </div>
    )
}

export default RelatedBlogSection