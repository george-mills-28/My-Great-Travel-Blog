import { useQuery } from '@tanstack/react-query'
import request from 'superagent'
import { Entry } from '../../models/entries' 

export default function useEntriesData(id: number) {
  return useQuery({
    queryKey: ['entries', id],
    queryFn: async () => {
      const res = await request.get(`/api/v1/entries/${id}`);
    if (res.ok) {
    return res.body as Entry
    }
    throw new Error(res.text)  
    },
  })
}
