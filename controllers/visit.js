'use strict'

const User = require('../models/user')
const Publication = require('../models/publication')
const Pet = require('../models/pet')
const Visit = require('../models/visit')

function getVisit (req, res){
  let visitId = req.params.visitId

  Visit.findById(visitId,(err,visit)=> {
    if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
    if(!visit) return res.status(404).send({message:`La visita no existe`})

    User.populate(visit, {path: "user"}, function(err, visit){
      Publication.populate(visit, {path: "publication"}, function(err, visit){
        Pet.populate(visit, {path: "publication.pet"}, function(err, visit){
          User.populate(visit, {path: "publication.user"}, function(err, visit){
            User.populate(visit, {path: "publication.pet.user"}, function(err, visit){
                res.status(200).send({ visit })
            });
          });
        });
      });
    });
  })
}

function getVisits (req, res){
  Visit.find({}, (err, visits) => {
    if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
    if(!visits) return res.status(404).send({message:`No existen visitaes`})

    User.populate(visits, {path: "user"}, function(err, visits){
      Publication.populate(visits, {path: "publication"}, function(err, visits){
        Pet.populate(visits, {path: "publication.pet"}, function(err, visits){
          User.populate(visits, {path: "publication.user"}, function(err, visits){
            User.populate(visits, {path: "publication.pet.user"}, function(err, visits){
                res.status(200).send({ visits })
            });
          });
        });
      });
    });
  })
}

function getVisitbyUser (req, res) {
  let userId = req.params.userId

  Visit.find({"user":userId}, (err, visits) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!visits) return res.status(404).send({message: `No existen visitaes`})

    User.populate(visits, {path: "user"}, function(err, visits){
      Publication.populate(visits, {path: "publication"}, function(err, visits){
        Pet.populate(visits, {path: "publication.pet"}, function(err, visits){
          User.populate(visits, {path: "publication.user"}, function(err, visits){
            User.populate(visits, {path: "publication.pet.user"}, function(err, visits){
                res.status(200).send({ visits })
            });
          });
        });
      });
    });
  })
}

function getVisitbyPublication (req, res) {
  let publicationId = req.params.publicationId

  Visit.find({"publication":publicationId}, (err, visits) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!visits) return res.status(404).send({message: `No existen visitaes`})

    User.populate(visits, {path: "user"}, function(err, visits){
      Publication.populate(visits, {path: "publication"}, function(err, visits){
        Pet.populate(visits, {path: "publication.pet"}, function(err, visits){
          User.populate(visits, {path: "publication.user"}, function(err, visits){
            User.populate(visits, {path: "publication.pet.user"}, function(err, visits){
                res.status(200).send({ visits })
            });
          });
        });
      });
    });
  })
}

function saveVisit (req, res) {
  console.log('POST /api/visit')
  console.log(req.body)

  let visit = new Visit()
  visit.user = req.body.user
  visit.publication = req.body.publication
  visit.date = req.body.date
  visit.place = req.body.place
  visit.message = req.body.message

  visit.save((err, visitStored) => {
    if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

    res.status(200).send({visit: visitStored})
  })
}

function updateVisit (req, res) {
  let visitId = req.params.visitId
  let update = req.body

  Visit.findByIdAndUpdate(visitId, update, (err, visitUpdated) =>{
    if(err) res.status(500).send({message: `Error al actualizar la visita: ${err}`})

    res.status(200).send({ visit: visitUpdated})
  })
}

function deleteVisit (req, res) {
  let visitId = req.params.visitId

  Visit.findById(visitId, (err, pet) => {
    if(err) res.status(500).send({message: `Error al borrar la visita: ${err}`})

    visit.remove(err => {
      if(err) res.status(500).send({message: `Error al borrar la visita: ${err}`})
      res.status(200).send({message: `La visita ha sido eliminada`})
    })
  })
}

module.exports = {
  getVisit,
  getVisits,
  getVisitbyUser,
  getVisitbyPublication,
  saveVisit,
  updateVisit,
  deleteVisit
}
