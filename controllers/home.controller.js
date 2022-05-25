const logger = require('../log/winston');
const mainServices = require('../services/main.services');

module.exports = {
    getHome: async (req, res) => {
        logger.info('Un usuario ha accedido a la pagina principal');
        const data = await mainServices.getAllMovies();
        if (data.length == 0) {
            res.status(200).render('index');
        } else {
            res.status(200).render('index', { data, user: req.user});
        }
    },
    getSearch: async (req, res) => {
        const category = req.query.categoria;
        logger.info(`Un usuario ha accedido a la pagina de ${category}`);
        const data = await mainServices.getByTipo(category);
        res.status(200).render('category', { data, category, user: req.user });
    },
    getAdd: (req, res) => {
        logger.info('Un usuario ha accedido a la pagina de add');
        res.status(200).render('form', { user: req.user });
    },
    postAdd: async (req, res) => {
        mainServices.saveProducts({ title: req.body.titulo, tipo: req.body.tipo, duration: req.body.duracion, urlImg: req.body.img });
        res.status(201).redirect(`/result?movie=${req.body.titulo}`);
    },
    getResult: (req, res) => {
        logger.info('Un usuario ha accedido a la pagina de result');
        res.status(200).render('result', { pelicula: req.query.movie });
    },
    getCart: async (req, res) => {
        const { cartId } = req.user;
        const dataCompleta = await mainServices.getCartById(cartId);
        const data = dataCompleta.products;
        logger.info('Un usuario ha accedido a la pagina de Favoritos');
        res.status(200).render('favorite', { data, user: req.user });
    },
    getConfirm: async (req, res) => {
        const { cartId } = req.user;
        const dataCompleta = await mainServices.getCartById(cartId);
        const data = dataCompleta.products;
        logger.info('Un usuario ha accedido a la pagina de Confirmacion de compra');
        res.status(200).render('confirmCart', { data, user: req.user });
    }
}