const mongoose = require('mongoose')
const Schema = mongoose.Schema

const avatarSchema = new Schema({
    name: { type: String, minLength: 3, maxLength: 30, trim: true, unique: true, required: true },
    image: { type: String }
})

module.exports = mongoose.model("Avatar", avatarSchema)