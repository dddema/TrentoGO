import mongoose from 'mongoose';

const User = mongoose.model('User', new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    surname: String
}))

const BlacklistedToken = mongoose.model('BlacklistedToken', new mongoose.Schema({
    token: String,
    expireAt: {
        type: Date,
        expires: 0
    }
}))

export { User, BlacklistedToken }