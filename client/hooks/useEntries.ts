import { useQuery } from '@tanstack/react-query'
import { getAllEntries } from '../apis/entries'

export default function useEntries() {
  return useQuery({
    queryKey: ['entries'],
    queryFn: () => getAllEntries
  })
}
