import { useState, useCallback, useEffect, useRef } from 'react';
import useGet from './useGet';

export default function useInfiniteApi(url, initialCursor, options = {}, limit = 5) {
  const [data, setData] = useState([]);
  const [nextCursor, setNextCursor] = useState(initialCursor || null);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);
  const observer = useRef(null);

  const { get, loading, error } = useGet(url, {}, options, false);

  const fetchData = useCallback(async (reset = false) => {

    const params = {
      ...options?.params,
      ...(nextCursor && { cursor: nextCursor }),
      limit,
    };

    const response = await get(params);
    const newData = response?.data || [];

    setData(prev => reset ? newData : [...prev, ...newData]);
    setNextCursor(response.nextCursor || null);
    setHasMore(!!response.nextCursor);

    return response;
  }, [url, nextCursor, options, limit]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!hasMore || loading) return;

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchData();
      }
    }, { threshold: 0.5 });

    if (loaderRef.current) {
      observer.current.observe(loaderRef.current);
    }

    return () => {
      observer.current?.disconnect();
    };
  }, [loading, hasMore, fetchData]);

  return {
    data,
    loading,
    error,
    loaderRef,
    hasMore,
  };
}
