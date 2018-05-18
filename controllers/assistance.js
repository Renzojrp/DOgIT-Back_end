'use strict'

const User = require('../models/user')
const Event = require('../models/event')
const Assistance = require('../models/assistance')

function getAssistance (req, res){
  let assistanceId = req.params.assistanceId

  Assistance.findById(assistanceId, (err, assistance) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!assistance) return res.status(484).send({message: `La publicación no existe`})

    Event.populate(assistance, {path: "event"}, function(err, assistance){
      User.populate(assistance, {path: "user"}, function(err, assistance){
        User.populate(assistance, {path: "event.user"}, function(err, assistance){
          res.send(200, { assistance })
        });
      });
    });

  })
}

function getAssistances (req, res) {
  Assistance.find({}, function(err,assistances){
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!assistances) return res.status(404).send({message: `No existen publicaciones`})

    Event.populate(assistances, {path: "event"}, function(err, assistances){
      User.populate(assistances, {path: "user"}, function(err, assistances){
        User.populate(assistances, {path: "event.user"}, function(err, assistances){
          res.send(200, { assistances })
        });
      });
    });
  });
}

function getAssistancebyEvent (req, res){
  let eventId = req.params.eventId

  Assistance.find({"event":eventId}, (err, assistances) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!assistances) return res.status(484).send({message: `No existen publicaciones con la mascota: ${eventId}`})

    Event.populate(assistances, {path: "event"}, function(err, assistances){
      User.populate(assistances, {path: "user"}, function(err, assistances){
        User.populate(assistances, {path: "event.user"}, function(err, assistances){
          res.send(200, { assistances })
        });
      });
    });
  })
}

function getAssistancebyUser (req, res){
  let userId = req.params.userId

  Assistance.find({"user": userId}, (err, assistances) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!assistances) return res.status(484).send({message: `No existen publicaciones del usuario: ${userId}`})

    Event.populate(assistances, {path: "event"}, function(err, assistances){
      User.populate(assistances, {path: "user"}, function(err, assistances){
        User.populate(assistances, {path: "event.user"}, function(err, assistances){
          res.send(200, { assistances })
        });
      });
    });
  })
}


function saveAssistance (req, res) {
  console.log('POST /api/assistance')
  console.log(req.body)

  let assistance = new Assistance()
  assistance.user = req.body.user
  assistance.event = req.body.event
  assistance.description = req.body.description
  assistance.requirements = req.body.requirements

  assistance.save((err, assistanceStored) => {
    if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

    res.status(200).send({assistance: assistanceStored})
  })
}

function updateAssistance (req, res) {
  let assistanceId = req.params.assistanceId
  let update = req.body

  Assistance.findByIdAndUpdate(assistanceId, update, (err, assistanceUpdated) =>{
    if(err) res.status(500).send({message: `Error al actualizar la publicación ${err}`})

    res.status(200).send({ assistance: assistanceUpdated})
  })
}

function deleteAssistance (req, res) {
  let assistanceId = req.params.assistanceId

  Assistance.findById(assistanceId, (err, assistance) => {
    if(err) res.status(500).send({message: `Error al borrar la publicación ${err}`})

    assistance.remove(err => {
      if(err) res.status(500).send({message: `Error al borrar la publicación ${err}`})
      res.status(200).send({message: `La publicación ha sido eliminado`})
    })
  })
}

module.exports = {
  getAssistance,
  getAssistances,
  getAssistancebyEvent,
  getAssistancebyUser,
  saveAssistance,
  updateAssistance,
  deleteAssistance
}
