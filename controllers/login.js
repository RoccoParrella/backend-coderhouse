const userModel = require('../models/user');
const logger = require('../log/winston');

module.exports = {
    getLogin: async (req, res) => {
        logger.info('Un usuario ha accedido a la pagina de login');
        res.status(200).render('login');
    },
    getLogout: async (req, res) => {
        logger.info('Un usuario ha accedido a la pagina de logout');
        const { name, lastname } = req.user;
        const username = `${name} ${lastname}`;
        req.logOut();
        res.status(200).render('bye', { username });
    },
    getSignUp: async (req, res) => {
        logger.info('Un usuario ha accedido a la pagina de signup');
        let error = req.query.error;
        if (error == 1) {
            res.status(200).render('signup', { error: 'Usuario ya registrado' });
            return
        }
        res.render('signup');
    },
    getErrorLogin: (req, res) => {
        logger.info('Un usuario ha accedido a la pagina de error login');
        res.status(404).render('error');
    },
    getErrorSignUp: (req, res) => {
        logger.info('Un usuario ha accedido a la pagina de error signup');
        res.status(404).render('errorR');
    },
    getProfile: async (req, res) => {
        logger.info('Un usuario ha accedido a la pagina de profile');
        const userId = req.user._id;
        const user = await userModel.getById(userId)
        res.status(200).render('profile', { user });
    }
}