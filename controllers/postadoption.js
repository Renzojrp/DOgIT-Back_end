'use strict'

const User = require('../models/user')
const Publication = require('../models/publication')
const Pet = require('../models/pet')
const Adoption = require('../models/adoption')
const Postadoption = require('../models/postadoption')

function getPostadoption (req, res){
  let postadoptionId = req.params.postadoptionId

  Postadoption.findById(adoptionId,(err,postadoption)=> {
    if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
    if(!postadoption) return res.status(404).send({message:`La adopción no existe`})

    Adoption.populate(postadoption, {path: "adoption"}, function(err, postadoption){
      User.populate(postadoption, {path: "user"}, function(err, postadoption){
        User.populate(postadoption, {path: "adoption.user"}, function(err, postadoption){
          Publication.populate(postadoption, {path: "adoption.publication"}, function(err, postadoption){
            Pet.populate(postadoption, {path: "adoption.publication.pet"}, function(err, postadoption){
              User.populate(postadoption, {path: "adoption.publication.user"}, function(err, postadoption){
                User.populate(postadoption, {path: "adoption.publication.pet.user"}, function(err, postadoption){
                    res.status(200).send({ postadoption })
                });
              });
            });
          });
        });
      });
    });
  })
}

function getPostadoptions (req, res){
  Postadoption.find({}, (err, postadoptions) => {
    if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
    if(!postadoptions) return res.status(404).send({message:`No existen adopciónes`})

    Adoption.populate(postadoptions, {path: "adoption"}, function(err, postadoptions){
      User.populate(postadoptions, {path: "user"}, function(err, postadoptions){
        User.populate(postadoptions, {path: "adoption.user"}, function(err, postadoptions){
          Publication.populate(postadoptions, {path: "adoption.publication"}, function(err, postadoptions){
            Pet.populate(postadoptions, {path: "adoption.publication.pet"}, function(err, postadoptions){
              User.populate(postadoptions, {path: "adoption.publication.user"}, function(err, postadoptions){
                User.populate(postadoptions, {path: "adoption.publication.pet.user"}, function(err, postadoptions){
                    res.status(200).send({ postadoptions })
                });
              });
            });
          });
        });
      });
    });
  })
}

function getPostadoptionbyUser (req, res) {
  let userId = req.params.userId

  Postadoption.find({"user":userId}, (err, postadoptions) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!postadoptions) return res.status(404).send({message: `No existen adopciónes`})

    Adoption.populate(postadoptions, {path: "adoption"}, function(err, postadoptions){
      User.populate(postadoptions, {path: "user"}, function(err, postadoptions){
        User.populate(postadoptions, {path: "adoption.user"}, function(err, postadoptions){
          Publication.populate(postadoptions, {path: "adoption.publication"}, function(err, postadoptions){
            Pet.populate(postadoptions, {path: "adoption.publication.pet"}, function(err, postadoptions){
              User.populate(postadoptions, {path: "adoption.publication.user"}, function(err, postadoptions){
                User.populate(postadoptions, {path: "adoption.publication.pet.user"}, function(err, postadoptions){
                    res.status(200).send({ postadoptions })
                });
              });
            });
          });
        });
      });
    });
  })
}

function savePostadoption (req, res) {
  console.log('POST /api/adoption')
  console.log(req.body)

  let postadoption = new Postadoption()
  postadoption.user = req.body.user
  postadoption.adoption = req.body.adoption
  postadoption.photo = req.body.photo

  postadoption.save((err, postadoptionStored) => {
    if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

    res.status(200).send({postadoption: postadoptionStored})
  })
}

function updatePostadoption (req, res) {
  let postadoptionId = req.params.postadoptionId
  let update = req.body

  Postadoption.findByIdAndUpdate(postadoptionId, update, (err, postadoptionUpdated) =>{
    if(err) res.status(500).send({message: `Error al actualizar la adopción: ${err}`})

    res.status(200).send({ postadoption: postadoptionUpdated})
  })
}

function deletePostadoption (req, res) {
  let postadoptionId = req.params.postadoptionId

  Postadoption.findById(postadoptionId, (err, pet) => {
    if(err) res.status(500).send({message: `Error al borrar la adopción: ${err}`})

    postadoptionId.remove(err => {
      if(err) res.status(500).send({message: `Error al borrar la adopción: ${err}`})
      res.status(200).send({message: `La adopción ha sido eliminada`})
    })
  })
}

module.exports = {
  getPostadoption,
  getPostadoptions,
  getPostadoptionbyUser,
  savePostadoption,
  updatePostadoption,
  deletePostadoption
}
