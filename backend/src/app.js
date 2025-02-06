import express from 'express'
import mongoose from 'mongoose'
import schemas from './schemas.js'
import dotenv from 'dotenv'

const app = express()
const port = 3000

dotenv.config()

async function connectMongoDB() {
  await mongoose.connect(process.env.MONGODB_CONN_STRING)
}

connectMongoDB().catch(err => console.error(err))

const User = mongoose.model('User', schemas.userSchema)

app.get('/', async (req, res) => {
  // const user = new User({ name: 'chri' })
  // await user.save()

  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})