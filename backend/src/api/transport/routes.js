import express from 'express'
import { getNearestBikeStall, getNearestScooter } from './controller.js'

const router = express.Router()

router.get('/near-bike-stall', getNearestBikeStall)
router.get('/near-scooter', getNearestScooter)

export default router