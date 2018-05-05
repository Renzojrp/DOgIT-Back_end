'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = mongoose.model('User')

const PetSchema = new Schema({
  user: {type: Schema.ObjectId, ref: "User"},
  name: String,
  gender: String,
  age: String,
  photo: { type: String, default: "" }
})

module.exports = mongoose.model('Pet', PetSchema)
