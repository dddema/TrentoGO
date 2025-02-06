import { Schema } from 'mongoose';

const userSchema = new Schema({
    name: String,
    surname: String,
})

export default { userSchema }