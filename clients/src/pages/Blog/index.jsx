import React from 'react'
import useBlogSummaries from '../../hooks/useBlogSummaries';
import ErrorMessage from '../../components/ErrorMessage';
import { BlogCards } from '../../components/BlogCards';
import BlogItemSkeletonloading from '../../components/SkeletonLoader.js/BlogItemSkeletonloading';
import { Helmet } from 'react-helmet';
const ReadingHistory = React.lazy(() => import('../../components/ReadingHistory'));
import { useUserAuthentication } from '../../context/userContext';

const apiUrl = import.meta.env.VITE_API_URL;

const Blog = () => {
  const { blogs, hasMore, loading, loaderDiv, perPage, resetBlogSummaries, errorMessage } = useBlogSummaries(`${apiUrl}/blog`);
  const { isAuthenticatedUser } = useUserAuthentication();
  if (errorMessage) {
    return <ErrorMessage heading='Unable to fetch blog' message={errorMessage} action={resetBlogSummaries} />
  }

  return (
    <>
      <Helmet>
        <title>Echoes & Insights: Blogs</title>
      </Helmet>
      {isAuthenticatedUser && <ReadingHistory heading="Continue Reading" shortFetch />}
      <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[2px] xs:gap-1.5 sm:gap-3 w-full'>
        <BlogCards cards={blogs} />
        {loading && Array.from({ length: perPage }).map((_, index) => <BlogItemSkeletonloading key={index} />)}
      </div>
      {!hasMore && <div className='w-full text-center dark:text-white font-bold text-3xl my-5'>You have reached to end</div>}
      <div ref={loaderDiv} />
    </>
  )
}

export default Blog