const CartList = require('../models/cartList');

module.exports = {
    getAll: async (req, res) => {
        let id = req.params.id;
        let data = await CartList.getAll(id);
        if (data) {
            if (data.length == 0) {
                res.status(404).send({
                    error: 404,
                    message: 'No hay ningun producto en el carrito'
                });
                return
            }
            res.status(200).send(data);
            return
        }
        res.status(404).send({
            error: 404,
            message: 'No existe el carrito'
        });
    },
    createCart: async (req, res) => {
        await CartList.createCart({ title: req.body.title, tipo: req.body.tipo, duration: req.body.duracion, urlImg: req.body.img })
        let id = await CartList.newId() - 1;
        res.status(200).send(`Carrito creado con id: ${id}`);
    },
    deleteCart: async (req, res) => {
        await CartList.deleteCart(req.params.id);
        res.status(200).send(`Carrito con id: ${req.params.id} eliminado correctamente!`);
    },
    addProduct: async (req, res) => {
        await CartList.addProduct(req.params.id, { title: req.body.title, tipo: req.body.tipo, duration: req.body.duracion, urlImg: req.body.img });
        let id = await CartList.newIdProduct(req.params.id) - 1;
        res.status(200).send(`Producto agregado con exito con el id: ${id}`);
    },
    deleteProduct: async (req, res) => {
        await CartList.deleteProduct(req.params.id, req.params.productId);
        res.status(200).send(`Producto eliminado con exito`);
    },
    notFound: (req, res) => {
        let url = req._parsedOriginalUrl.path;
        res.status(404).send({
            error: 404,
            message: `ruta: ${url} no encontrada`
        });
    }
}