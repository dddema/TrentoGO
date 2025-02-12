import mongoose from 'mongoose';

const favouritePlaceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    enum: ['home', 'work', 'dumbell', 'book', 'star'],
    default: 'star'
  },
  placeId: {
    type: String,
    required: true
  }
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
  ownerName: {
    type: String,
    required: true
  },
  ownerSurname: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  cvc: {
    type: String,
    required: true
  },
  expireAt: {
    type: Date,
    required: true
  }
})

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  fullName: {
    type: String,
    required: true
  },
  isGoogleAuth: {
    type: Boolean,
    default: false
  },
  googleId: String,
  preferences: {
    type: userPreferencesSchema,
    default: {}
  },
  creditCardInfo: creditCardInfoSchema
})

const bikeStallSchema = new mongoose.Schema({
  name: String,
  address: String,
  lat: Number,
  lng: Number
})

const blacklistedTokenSchema = new mongoose.Schema({
  token: String,
  expireAt: {
    type: Date,
    expires: 0
  }
})

const User = new mongoose.model('User', userSchema)
const BikeStall = new mongoose.model('BikeStall', bikeStallSchema)
const BlacklistedToken = new mongoose.model('BlacklistedToken', blacklistedTokenSchema)

export { User, BikeStall, BlacklistedToken }