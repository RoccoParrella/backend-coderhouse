// const { Router } = require("express");
// const router = new Router();
// const auth = require('../../middlewares/auth');
// const { getHome, getSearch, getAdd, getResult, postAdd, getCart, getConfirm } = require('../../controllers/home.controller');
const data = require('../../data/product.js');
const Router = require('koa-router');

const router = new Router({
    prefix: '/api'
})

router.get ('/', (ctx) => {
    ctx.body = JSON.stringify(data, null, 2);
})

router.get ("/:id", (ctx) => {
    const {id} = ctx.params;
    const product = data.find((i) => i.id == id);

    if (!product) {
        ctx.response.status = 404;
        return
    }

    ctx.body = JSON.stringify(product, null, 2);
})

router.post('/', (ctx) => {

    const newProduct = ctx.request.body;
    newProduct.id = data.length+1;
    data.push(newProduct);

    ctx.body = 'Producto agregado con exito';
})

router.delete('/:id', (ctx) => {
    const {id} = ctx.params;
    if(!id) {
        ctx.body = 'No se ingreso un id';
        return
    }

    const product = data.find((i) => i.id == id);

    if (!product) {
        ctx.body = 'No se encontro el producto';
        return
    }

    const eliminatedProduct = data.filter((i) => i.id != id);
    
    ctx.body = eliminatedProduct;
})

// router.get('/', auth, getHome);

// router.get(`/buscar`, auth, getSearch)

// router.get('/add', auth, getAdd)

// router.get('/result', auth, getResult)

// router.get('/favorites', auth, getCart)

// router.get('/confirm', auth, getConfirm)

// router.post('/add', auth, postAdd)


module.exports = router;