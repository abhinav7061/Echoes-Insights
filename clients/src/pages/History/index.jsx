import React from 'react';
import ReadingHistory from '../../components/ReadingHistory';
import NoHistory from '../../components/EmptyState/NoHistory';

const History = () => {
    return <ReadingHistory heading='Your History' emptyScreen={<NoHistory />} />
};

export default History;
