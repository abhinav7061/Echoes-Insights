import { useState, useCallback, useRef, useEffect } from 'react';
import { toast } from 'sonner'
import { useUserAuthentication } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

const rootApi = import.meta.env.VITE_API_URL;

export default function useApi(url, options = {}, autoFetch = false, checkAuth = false) {
    const [loading, setLoading] = useState(autoFetch);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [success, setSuccess] = useState(false);
    const abortControllerRef = useRef(null);
    const { logout, isAuthenticatedUser } = useUserAuthentication();
    const navigate = useNavigate();

    const reset = useCallback(() => {
        setLoading(false);
        setError(null);
        setData(null);
        setSuccess(false);
    }, []);

    const callApi = useCallback(async (config = {}) => {
        if (checkAuth && !isAuthenticatedUser) {
            setError('User is not authenticated');
            setLoading(false);
            setSuccess(false);
            return { error: 'User is not authenticated' };
        }
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        reset();
        setLoading(true);

        try {
            const { data: body, params: configParams, ...restConfig } = config;
            const mergedParams = { ...options.params, ...configParams };
            const queryParams = mergedParams
                ? `?${new URLSearchParams(mergedParams).toString()}`
                : '';

            const fullUrl = `${rootApi}${url}${queryParams}`;

            const isFormData = body instanceof FormData;

            const headers = {
                ...(!isFormData && { 'Content-Type': 'application/json' }),
                ...(localStorage.getItem('jwtToken') && { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }),
                ...({ ...options.headers, ...config.headers })
            };

            const requestBody = isFormData ? body : (body ? JSON.stringify(body) : undefined);

            const response = await fetch(fullUrl, {
                ...restConfig,
                signal: abortController.signal,
                headers,
                credentials: 'include',
                body: requestBody,
            });

            const responseData = await response.json();

            if (!response.ok || !responseData.success) {
                if (response.status === 401 && localStorage.getItem('jwtToken')) {
                    toast.error('Session expired. Please login again.');
                    // ⚠ Your session has expired. Please log in again.
                    logout();
                    navigate('/login', { state: { redirect: window.location.pathname } });
                    return;
                }
                throw new Error(responseData.message || 'Server error!');
            }
            const { success, message, ...data } = responseData;
            setData(data);
            setSuccess(true);
            return responseData;
        } catch (err) {
            const errorMessage = err.name === 'AbortError'
                ? 'Request was aborted'
                : err.message || 'An unknown error occurred';
            if (err.name !== 'AbortError') {
                setError(errorMessage);
            }
            setSuccess(false);
            return { error: errorMessage };
            // throw err; // Still throw error for cases where you want to handle it manually
        } finally {
            setLoading(false);
            abortControllerRef.current = null;
        }
    }, [reset, options, url,]);

    const abortRequest = useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }
    }, []);

    useEffect(() => {
        if (autoFetch) {
            if (checkAuth && !isAuthenticatedUser()) {
                setError('User is not authenticated');
                setLoading(false);
                setSuccess(false);
                return;
            }
            callApi();
        }
    }, [autoFetch, callApi, checkAuth, isAuthenticatedUser])

    return {
        loading,
        error,
        data,
        success,
        callApi,
        abortRequest,
        reset,
    };
}