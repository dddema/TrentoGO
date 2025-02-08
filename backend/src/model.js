import mongoose from 'mongoose';

const favouritePlaceSchema = new mongoose.Schema({
    title: String,
    icon: String,
    lat: Number,
    lng: Number
})

const userPreferencesSchema = new mongoose.Schema({
    theme: String,
    ratingWarning: Boolean,
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
    preferences: userPreferencesSchema,
    creditCardInfo: creditCardInfoSchema
})

const blacklistedTokenSchema = new mongoose.Schema({
    token: String,
    expireAt: {
        type: Date,
        expires: 0
    }
})

const FavouritePlace = new mongoose.model('FavouritePlace', favouritePlaceSchema)
const UserPreferences = new mongoose.model('UserPreferences', userPreferencesSchema)
const CreditCardInfo = new mongoose.model('CreditCardInfo', creditCardInfoSchema)
const User = new mongoose.model('User', userSchema)
const BlacklistedToken = new mongoose.model('BlacklistedToken', blacklistedTokenSchema)

export { User, FavouritePlace, UserPreferences, CreditCardInfo, BlacklistedToken }