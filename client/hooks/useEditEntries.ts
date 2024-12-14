import { useMutation, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
import { Entry } from '../../models/entries' 

export default function useEditEntry(id: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (values: Entry) => {
      await request.patch(`/api/v1/entries/${id}`).send(values)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['entries', id] })
      queryClient.invalidateQueries({ queryKey: ['entries'] })
    },
  })
}
