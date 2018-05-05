'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: String,
  lastName: String,
  mobilePhone: String,
  email: { type: String, unique: true, lowercase: true },
  password: { type: String, select: false },
  birthDate: String,  
  gender: String,
  photo: { type: String, default: "" },
  signupDate: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('User', UserSchema)
