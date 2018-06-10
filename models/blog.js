'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = mongoose.model('User')
const Pet = mongoose.model('Pet')

const BlogSchema = new Schema({
  user: {type: Schema.ObjectId, ref: "User"},
  pet: {type: Schema.ObjectId, ref: "Pet"},
  description: String,
  status: { type: String, default: "A" }
})

module.exports = mongoose.model('Blog', BlogSchema)
