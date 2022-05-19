const moviesMongo = require('../models/moviesMongo');
const logger = require('../log/winston');
const modelCart = require('../models/cartList');

module.exports = {
    getHome: async (req, res) => {
        logger.info('Un usuario ha accedido a la pagina principal');
        const data = await moviesMongo.getAll();
        const user = req.user;
        if (data.length == 0) {
            res.status(200).render('index');
        } else {
            res.status(200).render('index', { data, user});
        }
    },
    getSearch: async (req, res) => {
        const category = req.query.categoria;
        const user = req.user;
        logger.info(`Un usuario ha accedido a la pagina de ${category}`);
        const data = await moviesMongo.getAllByTipo(category);
        res.status(200).render('category', { data, category, user });
    },
    getAdd: (req, res) => {
        logger.info('Un usuario ha accedido a la pagina de add');
        const user = req.user;
        res.status(200).render('form', { user });
    },
    postAdd: async (req, res) => {
        moviesMongo.create({ title: req.body.titulo, tipo: req.body.tipo, duration: req.body.duracion, urlImg: req.body.img });
        res.status(201).redirect(`/result?movie=${req.body.titulo}`);
    },
    getResult: (req, res) => {
        logger.info('Un usuario ha accedido a la pagina de result');
        const pelicula = req.query.movie;
        res.status(200).render('result', { pelicula });
    },
    getCart: async (req, res) => {
        const { cartId } = req.user;
        const dataCompleta = await modelCart.getCartById(cartId);
        const data = dataCompleta.products;
        logger.info('Un usuario ha accedido a la pagina de Favoritos');
        res.status(200).render('favorite', { data, user: req.user });
    },
    getConfirm: async (req, res) => {
        const { cartId } = req.user;
        const dataCompleta = await modelCart.getCartById(cartId);
        const data = dataCompleta.products;
        logger.info('Un usuario ha accedido a la pagina de Confirmacion de compra');
        res.status(200).render('confirmCart', { data, user: req.user });
    }
}