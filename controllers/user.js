'use strict'

const User = require('../models/user')
const service = require('../services')

function signUp (req, res) {
  const user = new User({
    name: req.body.name,
    lastName: req.body.lastName,
    mobilePhone: req.body.mobilePhone,
    email: req.body.email,
    password: req.body.password,
    birthDate: req.body.birthDate,
    gender: req.body.gender
  })
    let email = req.body.email

  User.findOne({"email":email}, (err, user) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!user) {return user.save((err) => {
        if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` })
      })
      res.status(200).send({
        message: 'Te has registrado correctamente',
        token: service.createToken(user),
        user})
    } else {
      res.status(200).send({
        message: `Error`})
    }
  })


}

function signIn (req, res) {
  User.findOne({ email: req.body.email, password: req.body.password}, (err, user) => {
    if (err) return res.status(500).send({ message: err })
    if (!user) return res.status(404).send({ message: 'Usuario o contraseña no es correcto' })

    req.user = user
    res.status(200).send({
      message: 'Te has logueado correctamente',
      token: service.createToken(user),
      user
    })
  })
}

function updateUser (req, res){
  let userId = req.params.userId
  let update = req.body

  User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
    if(err) res.status(500).send({message: `Error al actualizar usuario: ${err}`})

      res.status(200).send({user: userUpdated})
  })
}

function getUsers (req, res) {
  User.find({}, (err, users) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!users) return res.status(404).send({message: `No existen usuarios`})

    res.send(200, { users })
  })
}

function getUser (req, res){
  let userId = req.params.userId

  User.findById(userId, (err, user) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!user) return res.status(484).send({message: `El usuario no existe`})

    res.status(200).send({ user })
  })
}

function getUserByEmail (req, res){
  let email = req.params.email

  User.findOne({"email":email}, (err, user) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!user) return res.status(200).send({message: `OK`})

    res.status(200).send({
      message: `Exist email`,
      user })
  })
}

function deleteUser (req, res) {
  let userId = req.params.userId

  User.findById(userId, (err, user) => {
    if(err) res.status(500).send({message: `Error al borrar el usuario ${err}`})

    user.remove(err => {
      if(err) res.status(500).send({message: `Error al borrar el usuario ${err}`})
      res.status(200).send({message: `El usuario ha sido eliminado`})
    })
  })
}

module.exports = {
  signUp,
  signIn,
  getUsers,
  getUser,
  getUserByEmail,
  updateUser,
  deleteUser
}
