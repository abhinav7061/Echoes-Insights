import React from 'react';
import ReadingHistory from '../../components/ReadingHistory';
import NoHistory from '../../components/EmptyState/NoHistory';

const History = ({ shortFetch }) => {
    return <ReadingHistory heading='Your History' emptyScreen={<NoHistory />} shortFetch={shortFetch} />
};

export default History;
