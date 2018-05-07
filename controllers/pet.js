'use strict'

const User = require('../models/user')
const Pet = require('../models/pet')

function getPet (req, res) {
  let petId = req.params.petId

  Pet.findById(petId, (err, pet) => {
    if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if(!pet) return res.status(404).send({message: `Error la mascota no existe`})

    User.populate(pet, {path: "user"}, function(err, pet){
        res.status(200).send({ pet })
    });

  })
}

function getPets (req, res) {
  Pet.find({}, (err, pets) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!pets) return res.status(404).send({message: `No existen mascotas`})

    User.populate(pets, {path: "user"}, function(err, pets){
        res.status(200).send({ pets })
    });
  })
}

function getPetbyUser (req, res) {
  let userId = req.params.userId

  Pet.find({"user":userId, "status": "A"}, (err, pets) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!pets) return res.status(404).send({message: `No existen mascotas`})

    User.populate(pets, {path: "user"}, function(err, pets){
        res.status(200).send({ pets })
    });
  })
}

function savePet (req, res) {
  console.log('POST /api/pet')
  console.log(req.body)

  let pet = new Pet()
  pet.user = req.body.user
  pet.name = req.body.name
  pet.weight = req.body.weight
  pet.size = req.body.size
  pet.gender = req.body.gender
  pet.age = req.body.age
  pet.rescue_date = req.body.rescue_date
  pet.photo = req.body.photo
  pet.description = req.body.description

  pet.save((err, petStored) => {
    if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

    res.status(200).send({pet: petStored})
  })
}

function updatePet (req, res) {
  let petId = req.params.petId
  let update = req.body

  Pet.findByIdAndUpdate(petId, update, (err, petUpdated) =>{
    if(err) res.status(500).send({message: `Error al actualizar la mascota: ${err}`})

    res.status(200).send({ instrumpetent: petUpdated})
  })
}

function deletePet (req, res) {
  let petId = req.params.petId

  Pet.findById(petId, (err, pet) => {
    if(err) res.status(500).send({message: `Error al borrar la mascota: ${err}`})

    pet.remove(err => {
      if(err) res.status(500).send({message: `Error al borrar la mascota: ${err}`})
      res.status(200).send({message: `La mascota ha sido eliminada`})
    })
  })
}

module.exports = {
  getPet,
  getPets,
  getPetbyUser,
  savePet,
  updatePet,
  deletePet
}
