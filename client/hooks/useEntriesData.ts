import { useQuery } from '@tanstack/react-query'
import { getEntryById } from '../apis/entries'

export default function useEntriesData(id: number) {
  return useQuery({
    queryKey: ['entry', id],
    queryFn: () => getEntryById(id)
  })
}
