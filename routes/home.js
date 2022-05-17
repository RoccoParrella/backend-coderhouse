const { Router } = require("express");
const router = new Router();
const auth = require('../middlewares/auth');
const { getHome, getSearch, getAdd, getResult, postAdd, getCart } = require('../controllers/home');


router.get('/', auth, getHome);

router.get(`/buscar`, auth, getSearch)

router.get('/add', auth, getAdd)

router.get('/result', auth, getResult)

router.get(/favorite/, auth, getCart)

router.post('/add', auth, postAdd)


module.exports = router;