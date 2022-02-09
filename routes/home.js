const multer = require('multer')
const path = require("path");
const express = require('express');
const { Router } = express;
const Contenedor = require('../clase');
const newProduct = new Contenedor('./productos.txt');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/images/productos"))
    },
    filename: function (req, file, cb) {
        cb(null,  file.originalname)
    }
})

const upload = multer({ storage: storage })
const router = new Router();



router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

router.get('/productos', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/form.html"))
})

router.post('/productos', upload.array('img',2), (req, res) => {
    newProduct.save({title: req.body.producto, price: req.body.precio, thumbnail: req.files[0].filename})
    res.redirect('/')
    res.status(201)
})


// API

// Traer todos los productos

router.get('/api/productos', (req, res) => {
    newProduct.getAll()
    res.status(200).send(newProduct.getAll())
    })

// Traer los productos por id

router.get('/api/productos/:id', (req, res) => {
    const id = req.params.id
    const producto = newProduct.getById(id)
    if (producto.length == 0) {
        res.status(404).send({
            error: "producto no encontrado"
        })  
    } else {
        res.status(200).send(producto)
    }
})

// Agrega un nuevo producto

router.post('/api/productos', (req, res) => {
    newProduct.save({title: req.body.title, price: req.body.price, thumbnail: req.body.thumbnail})
    let length = newProduct.arrayLenght()
    res.status(201).send(`Se ha agregado el producto ${req.body.title} con el id N${length}`)
})

// Modifica un producto

router.put('/api/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    newProduct.deleteById(id)
    newProduct.save({title: req.body.title, price: req.body.price, thumbnail: req.body.thumbnail, id: id})
    res.status(201).send(`Se ha modificado el producto correctamente`)
})

// Borrar todos los productos

router.delete('/api/productos/:id',(req, res) => {
    const id = parseInt(req.params.id)
    newProduct.deleteById(id)
    res.status(200).send('Se ha borrado el producto correctamente!')
    })

module.exports = router;