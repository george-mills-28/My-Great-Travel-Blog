import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteEntry } from '../apis/entries';

export default function useDeleteEntry(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn:  () => deleteEntry(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entries'] });
    },
  });
}