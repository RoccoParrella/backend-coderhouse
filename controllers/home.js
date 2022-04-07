const moviesMongo = require('../models/moviesMongo');

module.exports = {
    getHome: async (req, res) => {
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
        res.status(200).render('login');
    },
    getLogout: async (req, res) => {
        const { name, lastname } = req.user;
        const username = `${name} ${lastname}`;
        req.logOut();
        res.status(200).render('bye', { username });
    },
    getSignUp: async (req, res) => {
        let error = req.query.error;
        if(error == 1){
            res.status(200).render('signup', { error: 'Usuario ya registrado' });
            return
        }
        res.render('signup');
    },
    getBye: (req, res) => {
        res.render('bye', { user: req.query.user });
    },
    getSearch: async (req, res) => {
        const pelicula = req.query.categoria;
        const peliculas = await moviesMongo.getAll(pelicula);
        res.status(200).render('category', { peliculas, pelicula });
    },
    getAdd: (req, res) => {
        res.status(200).render('form');
    },
    postAdd: async (req, res) => {
        newProduct.save({ title: req.body.titulo, tipo: req.body.tipo, duration: req.body.duracion, urlImg: req.body.img });
        res.status(201).redirect(`/result?movie=${req.body.titulo}`);
    },
    getResult: (req, res) => {
        const pelicula = req.query.movie;
        res.status(200).render('result', { pelicula });
    },
    getError: (req, res) => {
        res.status(404).render('error');
    },
    getErrorSignUp: (req, res) => {
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