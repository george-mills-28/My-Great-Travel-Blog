import { useQuery } from '@tanstack/react-query'
import request from 'superagent'

import type { Entry } from '../../models/entries' 

export default function useEntries() {
  return useQuery({
    queryKey: ['entries'],
    queryFn: async () => {
      const res = await request.get('/api/v1/entries')
      if (res.ok) {
        return res.body as { entries: Entry[] }
      }

      throw new Error(res.text)
    },
  })
}
