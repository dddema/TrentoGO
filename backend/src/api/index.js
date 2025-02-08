import express from 'express'
import authRouter from './auth/routes.js'

const api = express.Router()

api.use('/auth', authRouter)

export default api