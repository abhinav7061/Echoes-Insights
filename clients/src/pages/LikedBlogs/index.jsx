import React from 'react';
import NoLikedBlogs from '../../components/EmptyState/NoLikedBlogs';
import Blogs from '../../components/Blogs';

const LikedBlogs = ({ shortFetch, className }) => {
    return <Blogs className={className} endPoint='/like/blog' shortFetch={shortFetch} emptyScreen={<NoLikedBlogs />} />;
};

export default LikedBlogs;
