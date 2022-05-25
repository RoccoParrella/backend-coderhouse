const { Router } = require("express");
const router = new Router();
const { getCartById, addToCart, deleteProduct } = require("../../controllers/cart.controller");

router.get('/getAll', getCartById);

router.post('/:cartId/:productId', addToCart);

router.delete('/:cartId/:productId', deleteProduct);

module.exports = router;