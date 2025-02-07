import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import md5 from 'md5'
import rateLimit from 'express-rate-limit'

import { User, BlacklistedToken } from './model.js'

const app = express()
const port = 3000

dotenv.config()

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]
  if (!token) return res.sendStatus(400)

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
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

// connect to mongodb server
mongoose.connect(process.env.MONGODB_CONN_STRING).catch(err => console.error(err))

app.use(bodyParser.json())

app.get('/', async (req, res) => {
  res.send('Hello World!')
})

app.get('/me', authenticateToken, (req, res) => {
  res.json(req.user)
})

app.post('/auth', authLimiter, async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email, password: md5(password) }, '_id email').exec()

  if (user) {
    const userPayload = { id: user.id, email: user.email }
    const token = jwt.sign(userPayload, process.env.JWT_SECRET, { expiresIn: '5m' })
    res.status(200).json({ token })
  } else {
    res.status(403).json({ message: "Email o password non corretta/e." })
  }
})

app.get('/logout', authenticateToken, async (req, res) => {
  const blacklistedToken = new BlacklistedToken({
    token: req.user.token,
    expireAt: new Date(req.user.exp * 1000 /* seconds to ms */)
  })

  blacklistedToken.save()
  
  res.sendStatus(200)
})

app.post('/signup', async (req, res) => {
  if (await User.findOne({ email: req.body.email }).exec()) {
    res.status(409).json({ message: "Email già utilizzata." })
  } else {
    const newUser = new User({
      email: req.body.email,
      password: md5(req.body.password),
      name: req.body.name,
      surname: req.body.surname
    })

    await newUser.save();
    res.status(200).json({ id: newUser.id, email: newUser.email })
  }
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})