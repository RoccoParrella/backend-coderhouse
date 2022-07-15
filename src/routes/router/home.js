const { Router } = require("express");
const router = new Router();
const auth = require('../../middlewares/auth');
const { getHome, getSearch, getChat, getResult, getChatEmail , getCart, getConfirm } = require('../../controllers/home.controller');

router.get('/', auth, getHome);

router.get(`/buscar`, auth, getSearch)

router.get('/chat', auth, getChat)

router.get('/chat/:email', auth, getChatEmail)

router.get('/result', auth, getResult)

router.get('/favorites', auth, getCart)

router.get('/confirm', auth, getConfirm)


module.exports = router;