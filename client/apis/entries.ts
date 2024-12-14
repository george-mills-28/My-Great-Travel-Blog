import request from 'superagent'
import { Entry } from '../../models/entries'

const baseUrl = '/api/v1/entries'

export async function getAllEntries() {
  const response = await request.get(baseUrl)
  return response.body
} 

export async function getEntryById(id: number){
  const response = await request.get(`/api/v1/entries/${id}`)
  return response.body as Entry
}

export async function addNewEntry(newEntry: Entry) {
  const res =  await request.post('/api/v1/entries').send(newEntry)
  return res.body
 
}

export async function updateEntry(id: number, values: Entry): Promise<void> {
  const res = await request.patch(`/api/v1/entries/${id}`).send(values);
  if (!res.ok) {
    throw new Error(res.text) // Handle API errors
  }
}

export async function deleteEntry(id: number) {
  const res = await request.delete(`/api/v1/entries/${id}`)
  return res.body
}