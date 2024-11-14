import { useState, useEffect, useRef, useCallback } from 'react';
import debounce from '../lib/debounce';

const useBlogSummaries = (apiEndpoint) => {
    const perPage = 4;
    const loaderDiv = useRef(null);
    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('all');
    const [searchPlaceholder, setSearchPlaceholder] = useState(null);

    const fetchMoreBlogs = useCallback(async () => {
        setLoading(true);
        setErrorMessage(null);

        try {
            const response = await fetch(`${apiEndpoint}/allBlogSummaries?page=${page}&limit=${perPage}&search=${encodeURIComponent(search)}&sort=${encodeURIComponent(sort)}`);
            const data = await response.json();

            if (data.success) {
                setBlogs(prevBlogs => [...prevBlogs, ...data.blogsSummary]);
                if (data.blogsSummary.length < perPage) setHasMore(false);
            } else {
                throw new Error(data.message || 'Error fetching the blogs');
            }
        } catch (error) {
            console.log(error.message);
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    }, [apiEndpoint, page, perPage]);

    // Effect to fetch more blogs
    useEffect(() => {
        if (hasMore) {
            fetchMoreBlogs();
        }
    }, [fetchMoreBlogs, hasMore, page]);

    // Intersection Observer for infinite scroll
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPage(prevPage => prevPage + 1);
            }
        }, {
            threshold: 1.0
        });

        if (loaderDiv.current) {
            observer.observe(loaderDiv.current);
        }

        return () => {
            if (loaderDiv.current) {
                observer.unobserve(loaderDiv.current);
            }
        };
    }, []);

    // Reset blogs summaries
    const resetBlogSummaries = () => {
        setBlogs([]);
        setSearchPlaceholder(search);
        setHasMore(true);
        setLoading(false);
        setErrorMessage(null);
        if (page == 1) {
            fetchMoreBlogs();
        } else {
            setPage(1);
        }
        setSearch('');
    };

    // Debounced search handler
    const debouncedSearch = useCallback(debounce((value) => {
        resetBlogSummaries();
    }, 300), []);

    // Handle search input change
    const handleSearchChange = (e) => {
        const { value } = e.target;
        setSearch(value);
        debouncedSearch(value);
    };

    return {
        blogs,
        loading,
        hasMore,
        search,
        sort,
        loaderDiv,
        perPage,
        setSort,
        resetBlogSummaries,
        searchPlaceholder,
        errorMessage,
        handleSearchChange
    };
};

export default useBlogSummaries;
