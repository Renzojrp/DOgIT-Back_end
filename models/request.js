'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = mongoose.model('User')
const Publication = mongoose.model('Publication')

const RequestSchema = new Schema({
  user: {type:Schema.ObjectId, ref:"User"},
  publication: {type:Schema.ObjectId, ref:"Publication"},
  date: { type: Date, default: Date.now() },
  message: String,
  status: { type: String, default: "S" }
})

module.exports = mongoose.model('Request', RequestSchema)
