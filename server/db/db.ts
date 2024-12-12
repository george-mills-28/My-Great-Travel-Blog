import connection from './connection.ts'
import { Knex } from 'knex'

interface Entry {
  id: number
  date: string
  location_name: string
  details: string
  image_url: string | null
}

export async function getAllEntries(db: Knex = connection): Promise<Entry[]> {
  return db('entries').select()
}

export async function getEntryById(id: number, db: Knex = connection): Promise<Entry | undefined> {
  return db('entries').where({ id }).first()
}

export async function addEntry(entry: Omit<Entry, 'id'>, db: Knex = connection): Promise<Entry[]> {
  return db('entries')
    .insert(entry)
    .returning(['id', 'date', 'location_name', 'details', 'image_url'])
}

export async function updateEntry(id: number, updatedEntry: Partial<Entry>, db: Knex = connection): Promise<Entry[]> {
  return db('entries')
    .where({ id })
    .update(updatedEntry)
    .returning(['id', 'date', 'location_name', 'details', 'image_url'])
}

export async function deleteEntry(id: number, db: Knex = connection): Promise<number> {
  return db('entries').where({ id }).delete()
}
