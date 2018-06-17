'use strict'

const User = require('../models/user')
const Event = require('../models/event')

function getEvent (req, res) {
  let eventId = req.params.eventId

  Event.findById(eventId, (err, event) => {
    if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if(!event) return res.status(404).send({message: `Error el evento no existe`})

    User.populate(event, {path: "user"}, function(err, event){
        res.status(200).send({ event })
    });

  })
}

function getEvents (req, res) {
  Event.find({"status": "A"}, (err, events) => {
    if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if(!events) return res.status(404).send({message: `No existen eventos`})

    User.populate(events, {path: "user"}, function(err, events){
        res.status(200).send({ events })
    });
  })
}

function getEventbyUser (req, res) {
  let userId = req.params.userId

  Event.find({"user":userId}, (err, events) => {
    if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if(!events) return res.status(404).send({message: `No existen eventos`})

    User.populate(events, {path: "user"}, function(err, events){
        res.status(200).send({ events })
    });
  })
}

function saveEvent (req, res) {
  console.log('POST /api/event')
  console.log(req.body)

  let event = new Event()
  event.user = req.body.user
  event.name = req.body.name
  event.photo = req.body.photo
  event.address = req.body.address
  event.description = req.body.description
  event.date = req.body.date
  event.capacity = req.body.capacity

  event.save((err, eventStored) => {
    if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

    res.status(200).send({event: eventStored})
  })
}

function updateEvent (req, res) {
  let eventId = req.params.eventId
  let update = req.body

  Event.findByIdAndUpdate(eventId, update, (err, eventUpdated) =>{
    if(err) res.status(500).send({message: `Error al actualizar el evento: ${err}`})

    res.status(200).send({ event: eventUpdated})
  })
}

function deleteEvent (req, res) {
  let eventId = req.params.eventId

  Event.findById(eventId, (err, event) => {
    if(err) res.status(500).send({message: `Error al borrar el evento: ${err}`})

    event.remove(err => {
      if(err) res.status(500).send({message: `Error al borrar el evento: ${err}`})
      res.status(200).send({message: `El evento ha sido eliminada`})
    })
  })
}

module.exports = {
  getEvent,
  getEvents,
  getEventbyUser,
  saveEvent,
  updateEvent,
  deleteEvent
}
