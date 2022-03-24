const moviesFirestore = require('../models/moviesFirestore');

const isAdmin = true;

module.exports = {
    getProducts: async (req, res)  => {
        let data = await moviesFirestore.getAll();
        if (data.length == 0) {
            res.status(404).send({
                error: 404,
                message: 'No hay ningun producto'
            });
            return
        }
        res.status(200).send(data);
    },
    getProductById: async (req, res) => {
        const id = req.params.id
        let movie = await moviesFirestore.getById(id);
        if (movie.length == 0) {
            res.status(404).send({
                error: 404,
                message: 'Producto no encontrado'
            });
            return
        }
        res.status(200).send(movie);
    },
    addProduct: async (req, res) => {
        if (isAdmin) {
            const movie = req.body;
            await moviesFirestore.create({ title: movie.title, tipo: movie.tipo, duration: movie.duracion, urlImg: movie.img});
            let length = await moviesFirestore.idProduct()
            res.status(201).send(`Se ha agregado con exito ${req.body.title} con el id N${length}`);
            return
        }
        res.status(403).send({
            error: -1,
            description: "ruta: /api/productos POST solo para administradores"
        })
    },
    editProduct: async (req, res) => {
        if (isAdmin) {
            const movie = req.body; 
            const id = parseInt(req.params.id);
            await moviesFirestore.updateById(id, { title: movie.title, tipo: movie.tipo, duration: movie.duracion, urlImg: movie.img});
            res.status(201).send(`Se ha modificado el producto correctamente`);
            return
        }
        res.status(403).send({
            error: -1,
            description: "ruta: /api/productos PUT solo para administradores"
        })
    },
    deleteProduct: async (req, res) => {
        if (isAdmin) {
            const id = parseInt(req.params.id);
            await moviesFirestore.deleteById(id);
            res.status(200).send('Se ha eliminado el producto correctamente!');
            return;
        }
        res.status(403).send({
            error: -1,
            description: "ruta: /api/productos DELETE solo para administradores"
        })
    },
    notFound: (req, res) => {
        res.status(404).send({
            error: 404,
            message: `ruta: no encontrada`
        });
    }
}