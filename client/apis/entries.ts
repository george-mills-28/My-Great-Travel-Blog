import request from 'superagent'

const baseUrl = '/api/v1/entries'

export async function getAllEntries() {
  const response = await request.get(baseUrl)
  return response.body
} 