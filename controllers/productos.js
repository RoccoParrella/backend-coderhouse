// const Contenedor = require('../models/clase');
// const newProduct = new Contenedor('./database/productos.txt');

// const isAdmin = true;

// module.exports = {
//     getProducts: (req, res) => {
//         let data = newProduct.getAll();
//         if (data.length == 0) {
//             res.status(404).send({
//                 error: 404,
//                 message: 'No hay ningun producto'
//             });
//             return
//         }
//         res.status(200).send(data);
//     },
//     getProductById: (req, res) => {
//         const id = req.params.id
//         let product = newProduct.getById(id);
//         if (product.length == 0) {
//             res.status(404).send({
//                 error: 404,
//                 message: 'Producto no encontrado'
//             });
//             return
//         }
//         res.status(200).send(product);
//     },
//     addProduct: (req, res) => {
//         if (isAdmin) {
//             newProduct.save({ title: req.body.title, tipo: req.body.tipo, duration: req.body.duracion, urlImg: req.body.img })
//             let length = newProduct.idProduct()
//             res.status(201).send(`Se ha agregado con exito ${req.body.title} con el id N${length}`)
//             return
//         }
//         res.status(403).send({
//             error: -1,
//             description: "ruta: /api/productos POST solo para administradores"
//         })
//     },
//     editProduct: (req, res) => {
//         if (isAdmin) {
//             const id = parseInt(req.params.id)
//             newProduct.deleteById(id)
//             newProduct.save({ title: req.body.title, tipo: req.body.tipo, duration: req.body.duracion, urlImg: req.body.img, id: id })
//             res.status(201).send(`Se ha modificado el producto correctamente`)
//             return
//         }
//         res.status(403).send({
//             error: -1,
//             description: "ruta: /api/productos PUT solo para administradores"
//         })
//     },
//     deleteProduct: (req, res) => {
//         if (isAdmin) {
//             const id = parseInt(req.params.id)
//             newProduct.deleteById(id)
//             newProduct.save({ title: req.body.title, tipo: req.body.tipo, duration: req.body.duracion, urlImg: req.body.img, id: id })
//             res.status(200).send('Se ha eliminado el producto correctamente!')
//             return
//         }
//         res.status(403).send({
//             error: -1,
//             description: "ruta: /api/productos DELETE solo para administradores"
//         })
//     },
//     notFound: (req, res) => {
//         let url = req._parsedOriginalUrl.pathname;
//         res.status(404).send({
//             error: 404,
//             message: `ruta: ${url} no encontrada`
//         });
//     }
// }