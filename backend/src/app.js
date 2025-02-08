import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import md5 from 'md5'
import rateLimit from 'express-rate-limit'
import api from './api'

const app = express()
const port = 3000

dotenv.config()
// connect to mongodb server
mongoose.connect(process.env.MONGODB_CONN_STRING).catch(err => console.error(err))

app.use(bodyParser.json())
app.use(api)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})