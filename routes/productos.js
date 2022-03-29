const { Router } = require("express");
const productos = require ('../controllers/productos');
const router = new Router();

// API

// Traer todos los productos 

router.get('/productos', productos.getProducts);

// Traer un 5 productos aleatorios

router.get('/productos-test', productos.getProductsRandom);

// Ruta no encontrada

router.get('/*', productos.notFound)

// Trae un producto en especifico

router.get('/productos/:id', productos.getProductById);

// Agrega un nuevo producto

router.post('/productos', productos.addProduct);

// Modifica un producto por id

router.put('/productos/:id', productos.editProduct);

// Borrar un producto por id

router.delete('/productos/:id', productos.deleteProduct);

module.exports = router;