'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = mongoose.model('User')
const Event = mongoose.model('Event')

const EventSchema = new Schema({
  user: {type: Schema.ObjectId, ref: "User"},
  event: {type: Schema.ObjectId, ref: "Event"}
})

module.exports = mongoose.model('Event', EventSchema)
