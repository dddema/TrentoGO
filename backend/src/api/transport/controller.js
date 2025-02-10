import { BikeStall } from '../../model.js'
import { calcDistance, genRandomPointInCircle } from './utils.js'

export const getNearestBikeStall = async (req, res) => {
  const { lat, lng } = req.query
  const bikeStalls = await BikeStall.find()

  const nearestBikeStall = bikeStalls.reduce((nearest, stall) => {
    const distance = calcDistance(lat, lng, stall.lat, stall.lng)
    return distance < nearest.distance ? { distance, stall } : nearest
  }, { distance: Infinity, stall: null }).stall

  res.status(200).json(nearestBikeStall)
}

export const getNearestScooter = async (req, res) => {
  const { lat, lng } = req.query

  // Fake data generation
  // would need to be replaced with actual
  // data from the scooter provider API
  const scooterCoords = genRandomPointInCircle({ lat, lng }, 0.01)
  
  res.status(200).json(scooterCoords)
}