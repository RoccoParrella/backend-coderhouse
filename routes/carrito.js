const { Router } = require("express");
const carrito = require('../controllers/carrito');
const router = new Router();


// API

// Traer todos los carritos

router.get('/carrito/:id/productos', carrito.getAll);

//Crear un carrito

router.post('/carrito', carrito.createCart);

// Borrar un carrito por id

router.delete('/carrito/:id', carrito.deleteCart);

// Agrega un nuevo producto

router.post('/carrito/:id/productos', carrito.addProduct);

// Borrar un producto por id

router.delete('/carrito/:id/productos/:productId', carrito.deleteProduct);

// Ruta no encontrada

router.get('/*', carrito.notFound)


module.exports = router;