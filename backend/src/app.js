const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')

async function connectMongoDB() {
  await mongoose.connect('mongodb+srv://gappe:cacca22@trentogo.vmokg.mongodb.net/?retryWrites=true&w=majority&appName=trentogo')
}

connectMongoDB().catch(err => console.error(err))

const schemas = require('./schemas')
const User = mongoose.model('User', schemas.userSchema)

app.get('/', async (req, res) => {
  // const user = new User({ name: 'chri' })
  // await user.save()

  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})