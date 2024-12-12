import connection from './connection.ts'
import { Entries } from '../../models/entries.ts'

export async function getAllEntries(db = connection): Promise<Entries[]> {
  return db('entries').select()
}
