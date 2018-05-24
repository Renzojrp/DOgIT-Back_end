'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = mongoose.model('User')
const Pet = mongoose.model('Pet')

const PublicationSchema = new Schema({
  user: {type: Schema.ObjectId, ref: "User"},
  pet: {type: Schema.ObjectId, ref: "Pet"},
  description: String,
  requirements: String,
  publicationDate: { type: Date, default: Date.now() },
  status: { type: String, default: "A" },
  address: String
})

module.exports = mongoose.model('Publication', PublicationSchema)
