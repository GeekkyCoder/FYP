import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteData, fetchData, postData, putData } from '../api/api';

//custom hook for get requests
export const useGet = (endpoint, queryKey, enabled = true) => {
  const queryKeyValue = typeof queryKey === 'object' ? [...queryKey] : [queryKey];

  return useQuery({
    queryKey: queryKeyValue,
    queryFn: () => fetchData(endpoint),
    enabled: enabled,
    refetchOnMount: true,
    retryOnMount: true,
  });
};

//custom hook for post request
export const usePost = (endpoint, querykey) => {
  const queryClient = useQueryClient();

  const queryData = typeof querykey === 'object' ? [...querykey] : querykey;
  // Mutations
  const mutation = useMutation({
    mutationFn: (data) => postData(endpoint, data),
    onSuccess: () => {
      // Invalidate and refetch
      if (typeof queryData === 'object') {
        for (let key of queryData) {
          queryClient.invalidateQueries({ queryKey: key });
        }
        return;
      }

      queryClient.invalidateQueries({ queryKey: queryData });
    },
  });

  return mutation;
};

export const usePut = (endpoint, querykey) => {
  const queryClient = useQueryClient();

  const queryData = typeof querykey === 'object' ? [...querykey] : querykey;
  // Mutations
  const mutation = useMutation({
    mutationFn: (data) => putData(endpoint, data),
    onSuccess: () => {
      if (typeof queryData === 'object') {
        for (let key of queryData) {
          queryClient.invalidateQueries({ queryKey: key });
        }
        return;
      }

      queryClient.invalidateQueries({ queryKey: queryData });
    },
  });

  return mutation;
};

export const useDelete = (endpoint, querykey) => {
  const queryClient = useQueryClient();

  const queryData = typeof querykey === 'object' ? [...querykey] : querykey;
  // Mutations
  const mutation = useMutation({
    mutationFn: () => deleteData(endpoint),
    onSuccess: () => {
      if (typeof queryData === 'object') {
        for (let key of queryData) {
          queryClient.invalidateQueries({ queryKey: key });
        }
        return;
      }

      queryClient.invalidateQueries({ queryKey: queryData });
    },
  });

  return mutation;
};
