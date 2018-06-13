'use strict'

const express = require('express')
const userControllers = require('../controllers/user')
const petControllers = require('../controllers/pet')
const publicationControllers = require('../controllers/publication')
const eventControllers = require('../controllers/event')
const assistanceControllers = require('../controllers/assistance')
const requestControllers = require('../controllers/request')
const blogControllers = require('../controllers/blog')
const adoptionControllers = require('../controllers/adoption')
const visitControllers = require('../controllers/visit')

const auth = require('../middlewares/auth')

const api = express.Router()

api.post('/signup', userControllers.signUp)
api.post('/signin', userControllers.signIn)
api.get('/user', userControllers.getUsers)
api.get('/user/:userId', userControllers.getUser)
api.get('/user/email/:email', userControllers.getUserByEmail)
api.delete('/user/:userId', userControllers.deleteUser)
api.put('/user/:userId', userControllers.updateUser)

api.get('/pet', petControllers.getPets)
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

api.get('/event', eventControllers.getEvents)
api.get('/event/:eventId', eventControllers.getEvent)
api.get('/event/user/:userId', eventControllers.getEventbyUser)
api.post('/event', eventControllers.saveEvent)
api.delete('/event/:eventId', eventControllers.deleteEvent)
api.put('/event/:eventId', eventControllers.updateEvent)

api.get('/assistance', assistanceControllers.getAssistances)
api.get('/assistance/:assistanceId', assistanceControllers.getAssistance)
api.get('/assistance/event/:eventId', assistanceControllers.getAssistancebyEvent)
api.get('/assistance/user/:userId', assistanceControllers.getAssistancebyUser)
api.post('/assistance', assistanceControllers.saveAssistance)
api.delete('/assistance/:assistanceId', assistanceControllers.deleteAssistance)
api.put('/assistance/:assistanceId', assistanceControllers.updateAssistance)

api.get('/blog', blogControllers.getBlogs)
api.get('/blog/:blogId', blogControllers.getBlog)
api.get('/blog/pet/:petId', blogControllers.getBlogbyPet)
api.get('/blog/user/:userId', blogControllers.getBlogbyUser)
api.get('/blog/status/:status', blogControllers.getBlogbyStatus)
api.post('/blog', blogControllers.saveBlog)
api.delete('/blog/:blogId', blogControllers.deleteBlog)
api.put('/blog/:blogId', blogControllers.updateBlog)

api.get('/request', requestControllers.getRequests)
api.get('/request/:requestId', requestControllers.getRequest)
api.get('/request/user/:userId', requestControllers.getRequestbyUser)
api.get('/request/publication/:publicationId', requestControllers.getRequestbyPublication)
api.post('/request', requestControllers.saveRequest)
api.delete('/request/:requestId', requestControllers.deleteRequest)
api.put('/request/:requestId', requestControllers.updateRequest)

api.get('/adoption', adoptionControllers.getAdoptions)
api.get('/adoption/:adoptionId', adoptionControllers.getAdoption)
api.get('/adoption/user/:userId', adoptionControllers.getAdoptionbyUser)
api.get('/adoption/publication/:publicationId', adoptionControllers.getAdoptionbyPublication)
api.post('/adoption', adoptionControllers.saveAdoption)
api.delete('/adoption/:adoptionId', adoptionControllers.deleteAdoption)
api.put('/adoption/:adoptionId', adoptionControllers.updateAdoption)

api.get('/visit', visitControllers.getVisits)
api.get('/visit/:visitId', visitControllers.getVisit)
api.get('/visit/user/:userId', visitControllers.getVisitbyUser)
api.get('/visit/publication/:publicationId', visitControllers.getVisitbyPublication)
api.post('/visit', visitControllers.saveVisit)
api.delete('/visit/:visitId', visitControllers.deleteVisit)
api.put('/visit/:visitId', visitControllers.updateVisit)

api.get('/private', auth, (req, res) => {
  res.status(200).send({ message: 'Tienes acceso' })
})

api.get('/open', (req, res) => {
  res.status(200).send({ message: 'No es necesario estar logueado para ver esta pagina' })
})

module.exports = api
