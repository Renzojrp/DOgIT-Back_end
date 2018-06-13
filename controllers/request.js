'use strict'

const User = require('../models/user')
const Publication = require('../models/publication')
const Pet = require('../models/pet')
const Request = require('../models/request')

function getRequest (req, res){
  let requestId = req.params.requestId

  Request.findById(requestId,(err,request)=> {
    if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
    if(!request) return res.status(404).send({message:`La solicitud no existe`})

    User.populate(request, {path: "user"}, function(err, request){
      Publication.populate(request, {path: "publication"}, function(err, request){
        Pet.populate(request, {path: "publication.pet"}, function(err, request){
          User.populate(request, {path: "publication.user"}, function(err, request){
            User.populate(request, {path: "publication.pet.user"}, function(err, request){
                res.status(200).send({ request })
            });
          });
        });
      });
    });
  })
}

function getRequests (req, res){
  Request.find({"status": "S"}, (err, requests) => {
    if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
    if(!requests) return res.status(404).send({message:`No existen solicitudes`})

    User.populate(requests, {path: "user"}, function(err, requests){
      Publication.populate(requests, {path: "publication"}, function(err, requests){
        Pet.populate(requests, {path: "publication.pet"}, function(err, requests){
          User.populate(requests, {path: "publication.user"}, function(err, requests){
            User.populate(requests, {path: "publication.pet.user"}, function(err, requests){
                res.status(200).send({ requests })
            });
          });
        });
      });
    });
  })
}

function getRequestbyUser (req, res) {
  let userId = req.params.userId

  Request.find({"user":userId, "status": "S"}, (err, requests) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!requests) return res.status(404).send({message: `No existen solicitudes`})

    User.populate(requests, {path: "user"}, function(err, requests){
      Publication.populate(requests, {path: "publication"}, function(err, requests){
        Pet.populate(requests, {path: "publication.pet"}, function(err, requests){
          User.populate(requests, {path: "publication.user"}, function(err, requests){
            User.populate(requests, {path: "publication.pet.user"}, function(err, requests){
                res.status(200).send({ requests })
            });
          });
        });
      });
    });
  })
}

function getRequestbyPublication (req, res) {
  let publicationId = req.params.publicationId

  Request.find({"publication":publicationId}, (err, requests) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!requests) return res.status(404).send({message: `No existen solicitudes`})

    User.populate(requests, {path: "user"}, function(err, requests){
      Publication.populate(requests, {path: "publication"}, function(err, requests){
        Pet.populate(requests, {path: "publication.pet"}, function(err, requests){
          User.populate(requests, {path: "publication.user"}, function(err, requests){
            User.populate(requests, {path: "publication.pet.user"}, function(err, requests){
                res.status(200).send({ requests })
            });
          });
        });
      });
    });
  })
}

function saveRequest (req, res) {
  console.log('POST /api/request')
  console.log(req.body)

  let request = new Request()
  request.user = req.body.user
  request.publication = req.body.publication
  request.message = req.body.message

  request.save((err, requestStored) => {
    if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

    res.status(200).send({request: requestStored})
  })
}

function updateRequest (req, res) {
  let requestId = req.params.requestId
  let update = req.body

  Request.findByIdAndUpdate(requestId, update, (err, requestUpdated) =>{
    if(err) res.status(500).send({message: `Error al actualizar la solicitud: ${err}`})

    res.status(200).send({ request: requestUpdated})
  })
}

function deleteRequest (req, res) {
  let requestId = req.params.requestId

  Request.findById(requestId, (err, pet) => {
    if(err) res.status(500).send({message: `Error al borrar la solicitud: ${err}`})

    request.remove(err => {
      if(err) res.status(500).send({message: `Error al borrar la solicitud: ${err}`})
      res.status(200).send({message: `La solicitud ha sido eliminada`})
    })
  })
}

module.exports = {
  getRequest,
  getRequests,
  getRequestbyUser,
  getRequestbyPublication,
  saveRequest,
  updateRequest,
  deleteRequest
}
