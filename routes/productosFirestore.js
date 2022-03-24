const { Router } = require("express");
const productos = require ('../controllers/productosFirestore');
const router = new Router();

// API

// Traer todos los productos 

router.get('/productos', productos.getProducts);

// Trae un producto en especifico

router.get('/productos/:id', productos.getProductById);

// Ruta no encontrada

router.get('/*', productos.notFound)

// Agrega un nuevo producto

router.post('/productos', productos.addProduct);

// Modifica un producto por id

router.put('/productos/:id', productos.editProduct);

// Borrar un producto por id

router.delete('/productos/:id', productos.deleteProduct);

module.exports = router;