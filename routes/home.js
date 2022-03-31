const { Router } = require("express");
const router = new Router();
const Contenedor = require('../models/clase');
const newProduct = new Contenedor('./database/productos.txt');
const auth = require('../middlewares/auth');
const session = require('express-session');

router.get('/', auth, (req, res) => {
    const data = newProduct.getAll();
    let user = req.session.user.user;
    if (data.length < 0) {
        res.status(200).render('index');
    } else {
        res.status(200).render('index', { data, user });
    }
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/logout', (req, res) => {
    let users = req.session.user.user
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect(`bye?user=${users}`);
        }
    })
})

router.get('/bye', (req, res) => {
    res.render('bye', { user: req.query.user });
})

router.post('/login', (req, res) => {
    const { user, password } = req.body;
    req.session.user = { 
        user: user,
        password: password
    };
    res.redirect('/');
})

router.get(`/buscar`, auth, (req, res) => {
    const pelicula = req.query.categoria;
    const peliculas = newProduct.getAll(pelicula);
    res.status(200).render('category', { peliculas, pelicula });
})

router.get('/add', auth, (req, res) => {
    res.status(200).render('form');
})
router.get('/result', auth, (req, res) => {
    const pelicula = req.query.movie;
    res.status(200).render('result', { pelicula });
})

router.post('/add', (req, res) => {
    newProduct.save({ title: req.body.titulo, tipo: req.body.tipo, duration: req.body.duracion, urlImg: req.body.img });
    res.status(201).redirect(`/pug/result?movie=${req.body.titulo}`);
})

module.exports = router;