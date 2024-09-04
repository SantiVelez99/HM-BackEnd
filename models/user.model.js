const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type: String, required: true, unique: true, minLength: 3, maxLength: 60, trim: true, match: /^[a-zA-Z0-9]+$/ },
    email: { type: String, required: true, unique: true, minLength: 8, maxLength: 60, trim: true, match: /.+@.+\..+/ },
    password: { type: String, required: true, minLength: 8, maxLength: 200, trim: true, match: /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/ },
    avatar: { type: String, required: true },
    role: { type: String, default: "USER_ROLE" },
    wins: { type: Number, default: 0 },
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: Date.now },
})

module.exports = mongoose.model("User", userSchema)