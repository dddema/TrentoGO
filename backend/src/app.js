import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import api from './api/index.js'

const app = express()
const port = 3000

dotenv.config()
// connect to mongodb server
mongoose.connect(process.env.MONGODB_CONN_STRING).catch(err => console.error(err))

app.use(cors())
app.use(bodyParser.json())
app.use(api)

app.use((req, res, next) => {
  res.status(404).json({ message: 'Risorsa non trovata.' })
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})