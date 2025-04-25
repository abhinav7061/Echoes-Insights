import React from 'react';
import NoSavedBlogs from '../../components/EmptyState/NoSavedBlogs';
import Blogs from '../../components/Blogs';


const SavedBlogs = ({ className, shortFetch }) => {
    return <Blogs className={className} endPoint='/save-blog/saved-blogs-summary' shortFetch={shortFetch} emptyScreen={<NoSavedBlogs />} />;
};

export default SavedBlogs;
