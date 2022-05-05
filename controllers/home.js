const moviesMongo = require('../models/moviesMongo');
const logger = require('../log/winston');

module.exports = {
    getHome: async (req, res) => {
        logger.info('Un usuario ha accedido a la pagina principal');
        const data = await moviesMongo.getAll();
        const { name, lastname } = req.user;
        const username = `${name} ${lastname}`;
        if (data.length < 0) {
            res.status(200).render('index');
        } else {
            res.status(200).render('index', { data, username });
        }
    },
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
        if(error == 1){
            res.status(200).render('signup', { error: 'Usuario ya registrado' });
            return
        }
        res.render('signup');
    },
    getBye: (req, res) => {
        logger.info('Un usuario ha accedido a la pagina de bye');
        res.render('bye', { user: req.query.user });
    },
    getSearch: async (req, res) => {
        const category = req.query.categoria;
        logger.info(`Un usuario ha accedido a la pagina de ${category}`);
        const data = await moviesMongo.getAllByTipo(category);
        res.status(200).render('category', { data, category });
    },
    getAdd: (req, res) => {
        logger.info('Un usuario ha accedido a la pagina de add');
        res.status(200).render('form');
    },
    postAdd: async (req, res) => {
        newProduct.save({ title: req.body.titulo, tipo: req.body.tipo, duration: req.body.duracion, urlImg: req.body.img });
        res.status(201).redirect(`/result?movie=${req.body.titulo}`);
    },
    getResult: (req, res) => {
        logger.info('Un usuario ha accedido a la pagina de result');
        const pelicula = req.query.movie;
        res.status(200).render('result', { pelicula });
    },
    getError: (req, res) => {
        logger.info('Un usuario ha accedido a la pagina de error');
        res.status(404).render('error');
    },
    getErrorSignUp: (req, res) => {
        logger.info('Un usuario ha accedido a la pagina de error signup');
        res.status(404).render('errorR');
    }

}













// 00000000000000000 POST LOGIN -----------------------
// const { email, password } = req.body;
//         try {
//             if(await userModel.existsByEmail(email)) {
//                 if(await userModel.isPasswordValid(email, password)) {
//                     const user = await userModel.getByEmail(email);
//                     req.session.user = user
//                     res.redirect('/');
//                     return;
//                 } else{
//                     res.redirect(`/login?error=2`);
//                     return;
//                 } 
//             } else {
//                 res.redirect(`/login?error=1`);
//                 return;
//             }
//         } catch (e) {
//             return res.status(500).send({ message: `Error en el servidor: ${e}` });
//         }





    // POST SIGUP -----------------------
// try{
//     if(await userModel.existsByEmail(req.body.email)) {
//         res.redirect('/signup?error=1');
//         return;
//     }
//     const user = await userModel.save(req.body);
//     user.username = `${user.name} ${user.lastname}`;
//     req.session.user = user;
//     res.redirect('/');
// }catch (e) {
//     return res.status(500).send({ message: `Error en el servidor: ${e}` });
// }