import { Router } from 'express'

import * as db from '../db/db.ts' 

const router = Router()

//GET 'api/v1/entries
router.get('/', async (req, res) => {
  try {
    const entries = await db.getAllEntries()

    res.json(entries)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})




export default router
