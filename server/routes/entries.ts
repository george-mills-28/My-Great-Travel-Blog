import express from 'express'
import * as db from '../db/db.js'

const router = express.Router()

// GET /api/v1/entries
router.get('/', async (req, res) => {
  try {
    const entries = await db.getAllEntries()
    res.json(entries)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Could not fetch entries' })
  }
})

// GET /api/v1/entries/:id
router.get('/:id', async (req, res) => {
  try {
    const entry = await db.getEntryById(Number(req.params.id))
    res.json(entry)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Could not fetch entry' })
  }
})

// POST /api/v1/entries
router.post('/', async (req, res) => {
  try {
    const newEntry = await db.addEntry(req.body)
    res.status(201).json(newEntry)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Could not add entry' })
  }
})

// PATCH /api/v1/entries/:id
router.patch('/:id', async (req, res) => {
  try {
    const updatedEntry = await db.updateEntry(Number(req.params.id), req.body)
    res.json(updatedEntry)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Could not update entry' })
  }
})

// DELETE /api/v1/entries/:id
router.delete('/:id', async (req, res) => {
  try {
    await db.deleteEntry(Number(req.params.id))
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Could not delete entry' })
  }
})

export default router
