import jwt from 'jsonwebtoken'
import md5 from 'md5'
import { OAuth2Client } from 'google-auth-library'
import { User, BlacklistedToken } from '../../model.js'

export const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email, password: md5(password) }, '_id')

  if (user) {
    const userPayload = { id: user.id, email: user.email }
    const token = jwt.sign(userPayload, process.env.JWT_SECRET, { expiresIn: '5m' })

    res.status(200).json({ token })
  } else {
    res.status(403).json({ message: 'Email o password non corretta/e.' })
  }
}

export const logout = async (req, res) => {
  const blacklistedToken = new BlacklistedToken({
    token: req.user.token,
    expireAt: new Date(req.user.exp * 1000 /* seconds to ms */)
  })

  await blacklistedToken.save()
  
  res.sendStatus(200)
}

export const signup = async (req, res) => {
  if (await User.exists({ email: req.body.email })) {
    res.status(409).json({ message: 'Email già utilizzata.' })
  } else {
    const newUser = new User({
      email: req.body.email,
      password: md5(req.body.password),
      fullName: req.body.fullName
    })

    await newUser.save()
    
    res.status(200).json({ id: newUser.id, email: newUser.email })
  }
}

export const googleAuth = async (req, res) => {
  const client = new OAuth2Client()
  const ticket = await client.verifyIdToken({
    idToken: req.body.idToken,
    audience: process.env.GOOGLE_CLIENT_ID
  })
  const payload = ticket.getPayload()
  const googleId = payload.sub
  
  let user = await User.findOne({ googleId }, '_id email')
  
  if (!user) {
    user = new User({
      email: payload.email,
      fullName: payload.name,
      isGoogleAuth: true,
      googleId
    })

    await user.save()
  }

  const userPayload = { id: user.id, email: user.email };
  const token = jwt.sign(userPayload, process.env.JWT_SECRET, { expiresIn: '5m' })

  res.status(200).json({ token })
}