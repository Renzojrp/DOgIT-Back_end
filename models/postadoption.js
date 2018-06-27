'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Adoption = mongoose.model('Adoption')
const User = mongoose.model('User')

const PostadoptionSchema = new Schema({
  user: {type:Schema.ObjectId, ref:"User"},
  adoption: {type:Schema.ObjectId, ref:"Adoption"},
  photo: { type: String, default: "" },
})

module.exports = mongoose.model('Postadoption', PostadoptionSchema)
