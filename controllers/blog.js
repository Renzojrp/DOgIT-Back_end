'use strict'

const User = require('../models/user')
const Pet = require('../models/pet')
const Blog = require('../models/blog')

function getBlog (req, res){
  let blogId = req.params.blogId

  Blog.findById(blogId, (err, blog) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!blog) return res.status(484).send({message: `El blog no existe`})

    Pet.populate(blog, {path: "pet"}, function(err, blog){
      User.populate(blog, {path: "user"}, function(err, blog){
        User.populate(blog, {path: "pet.user"}, function(err, blog){
          res.send(200, { blog })
        });
      });
    });

  })
}

function getBlogs (req, res) {
  Blog.find({}, function(err,blogs){
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!blogs) return res.status(404).send({message: `No existen publicaciones`})

    Pet.populate(blogs, {path: "pet"}, function(err, blogs){
      User.populate(blogs, {path: "user"}, function(err, blogs){
        User.populate(blogs, {path: "pet.user"}, function(err, blogs){
          res.send(200, { blogs })
        });
      });
    });
  });
}

function getBlogbyPet (req, res){
  let petId = req.params.petId

  Blog.find({"pet":petId, "status": "A"}, (err, blogs) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!blogs) return res.status(484).send({message: `No existen publicaciones con la mascota: ${petId}`})

    Pet.populate(blogs, {path: "pet"}, function(err, blogs){
      User.populate(blogs, {path: "user"}, function(err, blogs){
        User.populate(blogs, {path: "pet.user"}, function(err, blogs){
          res.send(200, { blogs })
        });
      });
    });
  })
}

function getBlogbyUser (req, res){
  let userId = req.params.userId

  Blog.find({"user": userId, "status": "A"}, (err, blogs) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!blogs) return res.status(484).send({message: `No existen publicaciones del usuario: ${userId}`})

    Pet.populate(blogs, {path: "pet"}, function(err, blogs){
      User.populate(blogs, {path: "user"}, function(err, blogs){
        User.populate(blogs, {path: "pet.user"}, function(err, blogs){
          res.send(200, { blogs })
        });
      });
    });
  })
}

function getBlogbyStatus (req, res){
  let status = req.params.status

  Blog.find({"status":"A"}, (err, blogs) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!blogs) return res.status(484).send({message: `No existen publicaciones en estado: ${status}`})

    Pet.populate(blogs, {path: "pet"}, function(err, blogs){
      User.populate(blogs, {path: "user"}, function(err, blogs){
        User.populate(blogs, {path: "pet.user"}, function(err, blogs){
          res.send(200, { blogs })
        });
      });
    });
  })
}

function saveBlog (req, res) {
  console.log('POST /api/blog')
  console.log(req.body)

  let blog = new Blog()
  blog.user = req.body.user
  blog.pet = req.body.pet
  blog.description = req.body.description

  blog.save((err, blogStored) => {
    if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

    res.status(200).send({blog: blogStored})
  })
}

function updateBlog (req, res) {
  let blogId = req.params.blogId
  let update = req.body

  Blog.findByIdAndUpdate(blogId, update, (err, blogUpdated) =>{
    if(err) res.status(500).send({message: `Error al actualizar la publicación ${err}`})

    res.status(200).send({ blog: blogUpdated})
  })
}

function deleteBlog (req, res) {
  let blogId = req.params.blogId

  Blog.findById(blogId, (err, blog) => {
    if(err) res.status(500).send({message: `Error al borrar la publicación ${err}`})

    blog.remove(err => {
      if(err) res.status(500).send({message: `Error al borrar la publicación ${err}`})
      res.status(200).send({message: `El blog ha sido eliminado`})
    })
  })
}

module.exports = {
  getBlog,
  getBlogs,
  getBlogbyPet,
  getBlogbyUser,
  getBlogbyStatus,
  saveBlog,
  updateBlog,
  deleteBlog
}
