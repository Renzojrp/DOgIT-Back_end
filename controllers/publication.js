'use strict'

const User = require('../models/user')
const Pet = require('../models/pet')
const Publication = require('../models/publication')

function getPublication (req, res){
  let publicationId = req.params.publicationId

  Publication.findById(publicationId, (err, publication) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!publication) return res.status(484).send({message: `La publicación no existe`})

    Pet.populate(publication, {path: "pet"}, function(err, publication){
      User.populate(publication, {path: "user"}, function(err, publication){
        User.populate(publication, {path: "pet.user"}, function(err, publication){
          res.send(200, { publication })
        });
      });
    });

  })
}

function getPublications (req, res) {
  Publication.find({}, function(err,publications){
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!publications) return res.status(404).send({message: `No existen publicaciones`})

    Pet.populate(publications, {path: "pet"}, function(err, publications){
      User.populate(publications, {path: "user"}, function(err, publications){
        User.populate(publications, {path: "pet.user"}, function(err, publications){
          res.send(200, { publications })
        });
      });
    });
  });
}

function getPublicationbyPet (req, res){
  let petId = req.params.petId

  Publication.find({"pet":petId, "status": "A"}, (err, publications) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!publications) return res.status(484).send({message: `No existen publicaciones con la mascota: ${petId}`})

    Pet.populate(publications, {path: "pet"}, function(err, publications){
      User.populate(publications, {path: "user"}, function(err, publications){
        User.populate(publications, {path: "pet.user"}, function(err, publications){
          res.send(200, { publications })
        });
      });
    });
  })
}

function getPublicationbyUser (req, res){
  let userId = req.params.userId

  Publication.find({"user": userId, "status": "A"}, (err, publications) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!publications) return res.status(484).send({message: `No existen publicaciones del usuario: ${userId}`})

    Pet.populate(publications, {path: "pet"}, function(err, publications){
      User.populate(publications, {path: "user"}, function(err, publications){
        User.populate(publications, {path: "pet.user"}, function(err, publications){
          res.send(200, { publications })
        });
      });
    });
  })
}

function getPublicationbyStatus (req, res){
  let status = req.params.status

  Publication.find({"status":"A"}, (err, publications) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!publications) return res.status(484).send({message: `No existen publicaciones en estado: ${status}`})

    Pet.populate(publications, {path: "pet"}, function(err, publications){
      User.populate(publications, {path: "user"}, function(err, publications){
        User.populate(publications, {path: "pet.user"}, function(err, publications){
          res.send(200, { publications })
        });
      });
    });
  })
}

function savePublication (req, res) {
  console.log('POST /api/publication')
  console.log(req.body)

  let publication = new Publication()
  publication.user = req.body.user
  publication.pet = req.body.pet
  publication.description = req.body.description
  publication.requirements = req.body.requirements
  publication.address = req.body.address

  publication.save((err, publicationStored) => {
    if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

    res.status(200).send({publication: publicationStored})
  })
}

function updatePublication (req, res) {
  let publicationId = req.params.publicationId
  let update = req.body

  Publication.findByIdAndUpdate(publicationId, update, (err, publicationUpdated) =>{
    if(err) res.status(500).send({message: `Error al actualizar la publicación ${err}`})

    res.status(200).send({ publication: publicationUpdated})
  })
}

function deletePublication (req, res) {
  let publicationId = req.params.publicationId

  Publication.findById(publicationId, (err, publication) => {
    if(err) res.status(500).send({message: `Error al borrar la publicación ${err}`})

    publication.remove(err => {
      if(err) res.status(500).send({message: `Error al borrar la publicación ${err}`})
      res.status(200).send({message: `La publicación ha sido eliminado`})
    })
  })
}

module.exports = {
  getPublication,
  getPublications,
  getPublicationbyPet,
  getPublicationbyUser,
  getPublicationbyStatus,
  savePublication,
  updatePublication,
  deletePublication
}
