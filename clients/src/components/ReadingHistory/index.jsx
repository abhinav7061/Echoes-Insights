import React from 'react';
import Blogs from '../Blogs'

const ReadingHistory = ({ shortFetch, heading, emptyScreen = null, className }) => {
    return <Blogs className={className} endPoint='/history' heading={heading} shortFetch={shortFetch} emptyScreen={emptyScreen} />
};

export default ReadingHistory;
