import { useState, useEffect, useCallback, useRef } from 'react';
import debounce from '../lib/debounce';
import apiRequest from '../lib/apiCalls/apiHelper';

const useInfiniteScroll = (apiEndpoint, perPage = 10, initialPage = 1, fetchParams = {}) => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(initialPage);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const loaderRef = useRef(null);
    const isFetching = useRef(false);

    const fetchMoreData = useCallback(async (url) => {
        if (isFetching.current || !hasMore || loading) return;
        isFetching.current = true;
        setLoading(true);
        setError(null);

        try {
            const queryParams = new URLSearchParams({
                page,
                limit: perPage,
                search,
                sort,
            }).toString();

            const response = await apiRequest(
                `${url}?${queryParams}`,
                'GET',
                null,
                fetchParams
            );

            setData(prevData => [...prevData, ...response.data]);
            if (response.data.length < perPage) setHasMore(false);
        } catch (err) {
            setError(err.message);
        } finally {
            isFetching.current = false;
            setLoading(false);
        }
    }, [page, perPage, search, sort, fetchParams, hasMore, loading]);

    const debouncedReset = useRef(
        debounce(() => {
            setPage(initialPage);
            setData([]);
            setHasMore(true);
        }, 1000)
    ).current;

    useEffect(() => {
        debouncedReset();
    }, [search, sort]);

    useEffect(() => {
        if (hasMore) {
            fetchMoreData(apiEndpoint);
        }
    }, [page, hasMore, apiEndpoint]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (isFetching.current || !hasMore || loading) return;
                if (entries[0].isIntersecting) {
                    setPage(prevPage => prevPage + 1);
                }
            },
            { threshold: 1.0 }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [hasMore, loading, isFetching]);

    useEffect(() => {
        setPage(1);
        setHasMore(true);
        setData([]);
        if (page == 1 && hasMore) fetchMoreData(apiEndpoint);
    }, [apiEndpoint])

    return { data, setData, page, setPage, loading, error, hasMore, loaderRef, setSearch, setSort, debouncedReset };
};

export default useInfiniteScroll;