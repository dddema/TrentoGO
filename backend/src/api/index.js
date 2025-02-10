import express from 'express'
import authRouter from './auth/routes.js'
import userRouter from './user/routes.js'
import transportRouter from './transport/routes.js'

const api = express.Router()

api.use('/auth', authRouter)
api.use('/user', userRouter)
api.use('/transport', transportRouter)

export default api