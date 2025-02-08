import jwt from 'jsonwebtoken'
import rateLimit from "express-rate-limit"
import { BlacklistedToken } from "../../model.js"

const authenticateToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]
  if (!token) return res.sendStatus(400)

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err || await BlacklistedToken.exists({ token })) {
      res.status(403).json({ message: "Non hai fatto l'accesso." })
    } else {
      user.token = token
      req.user = user
      next()
    }
  })
}

const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false
})

export { authenticateToken, authLimiter }