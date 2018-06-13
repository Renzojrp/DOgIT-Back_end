'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = mongoose.model('User')
const Publication = mongoose.model('Publication')

const VisitSchema = new Schema({
  user: {type:Schema.ObjectId, ref:"User"},
  publication: {type:Schema.ObjectId, ref:"Publication"},
  place: String,
  date: String,
  message: String
})

module.exports = mongoose.model('Visit', VisitSchema)
