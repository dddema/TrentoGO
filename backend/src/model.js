import mongoose from 'mongoose';

const favouritePlaceSchema = new mongoose.Schema({
  title: String,
  icon: String,
  lat: Number,
  lng: Number
})

const userPreferencesSchema = new mongoose.Schema({
  theme: {
    type: String,
    enum: ['light', 'dark', 'auto'],
    default: 'auto'
  },
  ratingWarning: {
    type: Boolean,
    default: true
  },
  favourites: [favouritePlaceSchema]
})

const creditCardInfoSchema = new mongoose.Schema({
  ownerName: String,
  ownerSurname: String,
  number: String,
  cvc: String,
  expireAt: Date
})

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  fullName: String,
  isGoogleAuth: Boolean,
  preferences: {
    type: userPreferencesSchema,
    default: {}
  },
  creditCardInfo: creditCardInfoSchema
})

const blacklistedTokenSchema = new mongoose.Schema({
  token: String,
  expireAt: {
    type: Date,
    expires: 0
  }
})

const User = new mongoose.model('User', userSchema)
const BlacklistedToken = new mongoose.model('BlacklistedToken', blacklistedTokenSchema)

export { User, BlacklistedToken }