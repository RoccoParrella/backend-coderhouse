const CartList = require('../models/cartList');
const cart = new CartList('./database/carrito.txt');

module.exports = {
    getAll: (req, res) => {
        let id = req.params.id;
        let data = cart.getAll(id);
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
    createCart: (req, res) => {
        let id = cart.createCart({ title: req.body.title, tipo: req.body.tipo, duration: req.body.duracion, urlImg: req.body.img })
        res.status(200).send(`Carrito creado con id: ${id}`);
    },
    deleteCart: (req, res) => {
        cart.deleteCart(req.params.id)
        res.sendStatus(200)
    },
    addProduct: (req, res) => {
        cart.addProduct(req.params.id, { title: req.body.title, tipo: req.body.tipo, duration: req.body.duracion, urlImg: req.body.img });
        res.sendStatus(200)
    },
    deleteProduct: (req, res) => {
        cart.deleteProduct(req.params.id, req.params.productId);
        res.sendStatus(200)
    },
    notFound: (req, res) => {
        let url = req._parsedOriginalUrl.path;
        res.status(404).send({
            error: 404,
            message: `ruta: ${url} no encontrada`
        });
    }
}