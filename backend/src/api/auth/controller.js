import { User, BlacklistedToken } from "../../model"

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email, password: md5(password) }, '_id')

  if (user) {
    const userPayload = { id: user.id, email: user.email }
    const token = jwt.sign(userPayload, process.env.JWT_SECRET, { expiresIn: '5m' })
    
    res.status(200).json({ token })
  } else {
    res.status(403).json({ message: "Email o password non corretta/e." })
  }
}

const logout = async (req, res) => {
  const blacklistedToken = new BlacklistedToken({
    token: req.user.token,
    expireAt: new Date(req.user.exp * 1000 /* seconds to ms */)
  })

  await blacklistedToken.save()
  
  res.sendStatus(200)
}

const signup = async (req, res) => {
  if (await User.exists({ email: req.body.email })) {
    res.status(409).json({ message: "Email già utilizzata." })
  } else {
    const newUser = new User({
      email: req.body.email,
      password: md5(req.body.password),
      name: req.body.name,
      surname: req.body.surname
    })

    await newUser.save()
    
    res.status(200).json({ id: newUser.id, email: newUser.email })
  }
}

export { login, logout, signup }