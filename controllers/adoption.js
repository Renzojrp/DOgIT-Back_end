'use strict'

const User = require('../models/user')
const Publication = require('../models/publication')
const Pet = require('../models/pet')
const Adoption = require('../models/adoption')

function getAdoption (req, res){
  let adoptionId = req.params.adoptionId

  Adoption.findById(adoptionId,(err,adoption)=> {
    if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
    if(!adoption) return res.status(404).send({message:`La adopción no existe`})

    User.populate(adoption, {path: "user"}, function(err, adoption){
      Publication.populate(adoption, {path: "publication"}, function(err, adoption){
        Pet.populate(adoption, {path: "publication.pet"}, function(err, adoption){
          User.populate(adoption, {path: "publication.user"}, function(err, adoption){
            User.populate(adoption, {path: "publication.pet.user"}, function(err, adoption){
                res.status(200).send({ adoption })
            });
          });
        });
      });
    });
  })
}

function getAdoptions (req, res){
  Adoption.find({"status": "S"}, (err, adoptions) => {
    if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
    if(!adoptions) return res.status(404).send({message:`No existen adopciónes`})

    User.populate(adoptions, {path: "user"}, function(err, adoptions){
      Publication.populate(adoptions, {path: "publication"}, function(err, adoptions){
        Pet.populate(adoptions, {path: "publication.pet"}, function(err, adoptions){
          User.populate(adoptions, {path: "publication.user"}, function(err, adoptions){
            User.populate(adoptions, {path: "publication.pet.user"}, function(err, adoptions){
                res.status(200).send({ adoptions })
            });
          });
        });
      });
    });
  })
}

function getAdoptionbyUser (req, res) {
  let userId = req.params.userId

  Adoption.find({"user":userId}, (err, adoptions) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!adoptions) return res.status(404).send({message: `No existen adopciónes`})

    User.populate(adoptions, {path: "user"}, function(err, adoptions){
      Publication.populate(adoptions, {path: "publication"}, function(err, adoptions){
        Pet.populate(adoptions, {path: "publication.pet"}, function(err, adoptions){
          User.populate(adoptions, {path: "publication.user"}, function(err, adoptions){
            User.populate(adoptions, {path: "publication.pet.user"}, function(err, adoptions){
                res.status(200).send({ adoptions })
            });
          });
        });
      });
    });
  })
}

function getAdoptionbyPublication (req, res) {
  let publicationId = req.params.publicationId

  Adoption.find({"publication":publicationId}, (err, adoptions) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!adoptions) return res.status(404).send({message: `No existen adopciónes`})

    User.populate(adoptions, {path: "user"}, function(err, adoptions){
      Publication.populate(adoptions, {path: "publication"}, function(err, adoptions){
        Pet.populate(adoptions, {path: "publication.pet"}, function(err, adoptions){
          User.populate(adoptions, {path: "publication.user"}, function(err, adoptions){
            User.populate(adoptions, {path: "publication.pet.user"}, function(err, adoptions){
                res.status(200).send({ adoptions })
            });
          });
        });
      });
    });
  })
}

function saveAdoption (req, res) {
  console.log('POST /api/adoption')
  console.log(req.body)

  let adoption = new Adoption()
  adoption.user = req.body.user
  adoption.publication = req.body.publication

  adoption.save((err, adoptionStored) => {
    if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

    res.status(200).send({adoption: adoptionStored})
  })
}

function updateAdoption (req, res) {
  let adoptionId = req.params.adoptionId
  let update = req.body

  Adoption.findByIdAndUpdate(adoptionId, update, (err, adoptionUpdated) =>{
    if(err) res.status(500).send({message: `Error al actualizar la adopción: ${err}`})

    res.status(200).send({ adoption: adoptionUpdated})
  })
}

function deleteAdoption (req, res) {
  let adoptionId = req.params.adoptionId

  Adoption.findById(adoptionId, (err, pet) => {
    if(err) res.status(500).send({message: `Error al borrar la adopción: ${err}`})

    adoption.remove(err => {
      if(err) res.status(500).send({message: `Error al borrar la adopción: ${err}`})
      res.status(200).send({message: `La adopción ha sido eliminada`})
    })
  })
}

module.exports = {
  getAdoption,
  getAdoptions,
  getAdoptionbyUser,
  getAdoptionbyPublication,
  saveAdoption,
  updateAdoption,
  deleteAdoption
}
