const cartModel = require('../models/cartList');

module.exports = {
    getCartById: async (req, res) => {
        if (!req.session) {
            return res.sendStatus(404)
        }
        const id = req.user.cartId
        const cart = await cartModel.getCartById(id)
        res.send(cart).status(200)
    },
    addToCart: async (req, res) => {
        const { cartId, productId } = req.params;
        await cartModel.addProduct(cartId, productId);
        res.status(200)
    },
    emptyCart: async (req, res) => {
        const { cartId } = req.params;
        const cart = await cartModel.emptyCart(cartId);
        return cart
    },
    deleteProduct: async (req, res) => {
        const { cartId, productId } = req.params;
        const cart = await cartModel.deleteProduct(cartId, productId);
        return cart
    }
}
