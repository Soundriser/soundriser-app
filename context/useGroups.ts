import useSWR from 'swr';
import { apiFetcher } from '../lib/fetcher';

export function useGroups(email:any) {
    const { data, error, isLoading, mutate } = useSWR(`/api/get-groups?email=${email}`, apiFetcher, {
        shouldRetryOnError: false
    });

    return {
        data: data?.data || [],
        isLoading,
        isError: error,
        mutateWishList: mutate
    }
}