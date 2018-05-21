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
              res.status(200).send({ request })
          });
        });
      });
    });
  })
}

function getRequest (req, res){
  Reques.find({}, (err, requests) => {
    if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
    if(!requests) return res.status(404).send({message:`No existen solicitudes`})

    User.populate(requests, {path: "user"}, function(err, requests){
      Publication.populate(requests, {path: "publication"}, function(err, requests){
        Pet.populate(requests, {path: "publication.pet"}, function(err, requests){
          User.populate(requests, {path: "publication.user"}, function(err, requests){
              res.status(200).send({ requests })
          });
        });
      });
    });
  })
}
