'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: String,
  lastName: String,
  mobilePhone: { type: String, default: "" },
  email: { type: String, unique: true, lowercase: true },
  password: { type: String, select: false },
  birthDate: { type: String, default: "" },
  gender: { type: String, default: "" },,
  photo: { type: String, default: "" },
  signupDate: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('User', UserSchema)
