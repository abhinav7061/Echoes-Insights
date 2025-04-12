import { useCallback } from 'react';
import useApi from './useApi'

export default function useGet(url, params = {}, options = {}, autoFetch = true) {
  const api = useApi(url, { ...options, params }, autoFetch);
  const get = useCallback(async (additionalParams = {}) => {
    const mergedParams = { ...params, ...additionalParams };
    return api.callApi({
      method: 'GET',
      params: mergedParams
    });
  }, [api.callApi, params]);

  return {
    ...api,
    get,
  };
}