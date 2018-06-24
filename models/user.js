'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: String,
  type: { type: String, default: "user" }
  lastName: String,
  mobilePhone: { type: String, default: "" },
  email: { type: String, unique: true, lowercase: true },
  password: String,
  birthDate: { type: String, default: "" },
  gender: { type: String, default: "" },
  photo: { type: String, default: "" },
  signupDate: { type: Date, default: Date.now() },
  workPlace: String,
  dni:  Number,
  address: String,
  district: String,
  status: { type: String, default: "A" }
})

module.exports = mongoose.model('User', UserSchema)
