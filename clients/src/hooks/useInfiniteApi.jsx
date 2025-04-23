import { useState, useCallback, useEffect, useRef } from 'react';
import useGet from './useGet';

export default function useInfiniteApi(url, initialCursor = null, options = {}) {
  const [data, setData] = useState([]);
  const [nextCursor, setNextCursor] = useState(initialCursor);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(true);
  const loaderRef = useRef(null);
  const observer = useRef(null);

  const { get, error } = useGet(url, {}, options, false);

  const fetchData = useCallback(async (reset = false) => {
    setIsFetching(true);
    const params = {
      ...options?.params,
      ...(nextCursor && !reset && { cursor: nextCursor }),
    };

    const response = await get(params);
    const newData = response?.data || [];

    setData(prev => reset ? newData : [...prev, ...newData]);
    setNextCursor(response.nextCursor || null);
    setHasMore(!!response.nextCursor);
    setIsFetching(false);
  }, [get, hasMore, isFetching, nextCursor, options?.params]);

  useEffect(() => {
    fetchData(true);
  }, [url]);

  useEffect(() => {
    if (!hasMore || isFetching) return;

    const observerOptions = {
      root: null,
      rootMargin: '100px',
      threshold: 0.1,
    };

    const handleIntersect = (entries) => {
      if (entries[0].isIntersecting) {
        fetchData();
      }
    };

    const currentObserver = new IntersectionObserver(handleIntersect, observerOptions);
    observer.current = currentObserver;

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      currentObserver.observe(currentLoader);
    }

    return () => {
      if (currentObserver && currentLoader) {
        currentObserver.unobserve(currentLoader);
      }
    };
  }, [fetchData, hasMore, isFetching]);

  const reset = useCallback(() => {
    setData([]);
    setNextCursor(initialCursor);
    setHasMore(true);
    fetchData(true);
  }, [initialCursor, fetchData]);

  return {
    data,
    loading: isFetching,
    error,
    loaderRef,
    hasMore,
    reset,
  };
}