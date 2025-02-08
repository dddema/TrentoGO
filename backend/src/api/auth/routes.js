import express from "express"
import { login, logout, signup } from "./controller.js"
import { authLimiter, authenticateToken } from "./middleware.js"

const router = express.Router()

router.post('/login', authLimiter, login)
router.get('/logout', authenticateToken, logout)
router.post('/signup', signup)

export default router