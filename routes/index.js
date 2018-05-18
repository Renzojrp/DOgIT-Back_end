'use strict'

const express = require('express')
const userControllers = require('../controllers/user')
const petControllers = require('../controllers/pet')
const publicationControllers = require('../controllers/publication')

const auth = require('../middlewares/auth')

const api = express.Router()

api.post('/signup', userControllers.signUp)
api.post('/signin', userControllers.signIn)
api.get('/user', userControllers.getUsers)
api.get('/user/:userId', userControllers.getUser)
api.get('/user/email/:email', userControllers.getUserByEmail)
api.delete('/user/:userId', userControllers.deleteUser)
api.put('/user/:userId', userControllers.updateUser)

api.get('/pet', auth, petControllers.getPets)
api.get('/pet/:petId', petControllers.getPet)
api.get('/pet/user/:userId', petControllers.getPetbyUser)
api.post('/pet', petControllers.savePet)
api.delete('/pet/:petId', petControllers.deletePet)
api.put('/pet/:petId', petControllers.updatePet)

api.get('/publication', publicationControllers.getPublications)
api.get('/publication/:publicationId', publicationControllers.getPublication)
api.get('/publication/pet/:petId', publicationControllers.getPublicationbyPet)
api.get('/publication/user/:userId', publicationControllers.getPublicationbyUser)
api.get('/publication/status/:status', publicationControllers.getPublicationbyStatus)
api.post('/publication', publicationControllers.savePublication)
api.delete('/publication/:publicationId', publicationControllers.deletePublication)
api.put('/publication/:publicationId', publicationControllers.updatePublication)

api.get('/private', auth, (req, res) => {
  res.status(200).send({ message: 'Tienes acceso' })
})

api.get('/open', (req, res) => {
  res.status(200).send({ message: 'No es necesario estar logueado para ver esta pagina' })
})

module.exports = api
