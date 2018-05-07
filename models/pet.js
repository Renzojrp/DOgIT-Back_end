'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = mongoose.model('User')

const PetSchema = new Schema({
  user: {type: Schema.ObjectId, ref: "User"},
  name: String,
  weigth: String,
  size: String,
  gender: String,
  age: String,
  rescue_date: String,
  photo: { type: String, default: "" },
  description : String
})

module.exports = mongoose.model('Pet', PetSchema)
