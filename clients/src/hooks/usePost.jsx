export function usePost(url, options = {}, autoFetch = false) {
    const api = useApi(url, options, autoFetch);

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