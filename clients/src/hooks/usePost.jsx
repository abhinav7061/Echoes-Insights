import { useCallback } from "react";
import useApi from "./useApi";

export function usePost(url, options = {}, autoFetch = false, checkAuth = false) {
    const api = useApi(url, options, autoFetch, checkAuth = false);

    const post = useCallback(async (data) => {
        return api.callApi({
            method: 'POST',
            data,
            headers: {
                ...options.headers
            }
        });
    }, [api.callApi, options.headers]);

    return {
        ...api,
        post,
    };
}