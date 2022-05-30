const { Router } = require("express");
const router = new Router();
const auth = require('../../middlewares/auth');
const { getHome, getSearch, getAdd, getResult, postAdd, getCart, getConfirm } = require('../../controllers/home.controller');


router.get('/', auth, getHome);

router.get(`/buscar`, auth, getSearch)

router.get('/add', auth, getAdd)

router.get('/result', auth, getResult)

router.get('/favorites', auth, getCart)

router.get('/confirm', auth, getConfirm)

router.post('/add', auth, postAdd)


module.exports = router;