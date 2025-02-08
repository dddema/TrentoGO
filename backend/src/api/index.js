import express from 'express'
import authRouter from './auth/routes.js'
import userRouter from './user/routes.js'

const api = express.Router()

api.use('/auth', authRouter)
api.use('/user', userRouter)

export default api