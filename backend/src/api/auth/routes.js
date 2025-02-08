import express from "express"
import { login, logout, signup } from "./controller"
import { authLimiter, authenticateToken } from "./middleware"

const router = express.Router()

router.post('/login', authLimiter, login)
router.get('/logout', authenticateToken, logout)
router.post('/signup', signup)

export default router