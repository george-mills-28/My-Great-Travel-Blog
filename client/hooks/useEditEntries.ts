import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Entry } from '../../models/entries' 
import { updateEntry } from '../apis/entries'

// export default function useEditEntry(id: number) {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: async (values: Entry) => {
//       await request.patch(`/api/v1/entries/${id}`).send(values)
//     },
//     onSuccess: async () => {
//       queryClient.invalidateQueries({ queryKey: ['entry', id] })
//       queryClient.invalidateQueries({ queryKey: ['entry'] })
//     },
//   })
// }

export default function useEditEntry(id: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (values: Entry) => {
      await updateEntry(id, values) 
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['entry', id] })
      queryClient.invalidateQueries({ queryKey: ['entries'] })
    },
    onError: (error) => {
      console.error('Error updating entry:', error)
    },
  })
}
