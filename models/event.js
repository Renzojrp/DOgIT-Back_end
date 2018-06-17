'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = mongoose.model('User')

const EventSchema = new Schema({
  user: {type: Schema.ObjectId, ref: "User"},
  name: String,
  photo: String,
  address: String,
  description: String,
  date: String,
  capacity: Number,
  status: { type: String, default: "A" }
})

module.exports = mongoose.model('Event', EventSchema)
