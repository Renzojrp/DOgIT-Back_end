'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = mongoose.model('User')
const Publication = mongoose.model('Publication')

const AdoptionSchema = new Schema({
  user: {type:Schema.ObjectId, ref:"User"},
  publication: {type:Schema.ObjectId, ref:"Publication"},
  date: { type: Date, default: Date.now() },
})

module.exports = mongoose.model('Adoption', AdoptionSchema)
