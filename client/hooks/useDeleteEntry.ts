import { useMutation, useQueryClient } from '@tanstack/react-query';
import request from 'superagent';

export default function useDeleteEntry(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await request.delete(`/api/v1/entries/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entries'] });
    },
  });
}