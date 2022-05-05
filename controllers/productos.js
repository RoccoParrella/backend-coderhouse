const moviesMongo = require('../models/moviesMongo');
const logger = require('../log/winston');

const isAdmin = true;

module.exports = {
    getProducts: async (req, res)  => {
        let data = await moviesMongo.getAll();
        if (data.length == 0) {
            logger.error('No hay peliculas en la base de datos');
            res.status(404).send({
                error: 404,
                message: 'No hay ningun producto'
            });
            return
        }
        logger.info('Peliculas obtenidas correctamente');
        res.status(200).send(data);
    },
    getProductById: async (req, res) => {
        const id = req.params.id
        let movie = await moviesMongo.getById(id);
        if (movie.length == 0) {
            logger.error(`No existe la pelicula con id: ${id}`);
            res.status(404).send({
                error: 404,
                message: 'Producto no encontrado'
            });
            return
        }
        logger.info(`Pelicula con id: ${id} obtenida correctamente`);
        res.status(200).send(movie);
    },
    addProduct: async (req, res) => {
        if (isAdmin) {
            const movie = req.body;
            await moviesMongo.create({ title: movie.title, tipo: movie.tipo, duration: movie.duracion, urlImg: movie.img});
            let length = await moviesMongo.idProduct()
            res.status(201).send(`Se ha agregado con exito ${req.body.title} con el id N${length}`);
            logger.info(`Se ha agregado con exito ${req.body.title} con el id N${length}`);
            return
        }
        logger.error('No tiene permisos para agregar un producto');
        res.status(403).send({
            error: -1,
            description: "ruta: /api/productos POST solo para administradores"
        })
    },
    editProduct: async (req, res) => {
        if (isAdmin) {
            const movie = req.body; 
            const id = parseInt(req.params.id);
            await moviesMongo.updateById(id, { title: movie.title, tipo: movie.tipo, duration: movie.duracion, urlImg: movie.img});
            logger.info(`Se ha editado con exito ${req.body.title} con el id N${id}`);
            res.status(201).send(`Se ha modificado el producto correctamente`);
            return
        }
        logger.error('No tiene permisos para editar un producto');
        res.status(403).send({
            error: -1,
            description: "ruta: /api/productos PUT solo para administradores"
        })
    },
    deleteProduct: async (req, res) => {
        if (isAdmin) {
            const id = parseInt(req.params.id);
            await moviesMongo.deleteById(id);
            logger.info(`Se ha eliminado con exito el producto con id N${id}`);
            res.status(200).send('Se ha eliminado el producto correctamente!');
            return;
        }
        logger.error('No tiene permisos para eliminar un producto');
        res.status(403).send({
            error: -1,
            description: "ruta: /api/productos DELETE solo para administradores"
        })
    },
    notFound: (req, res) => {
        logger.error('Ruta no encontrada');
        res.status(404).send({
            error: 404,
            message: `ruta: no encontrada`
        });
    }
}