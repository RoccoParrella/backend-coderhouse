const cartServices = require('../services/cart.services');

module.exports = {
    getCartById: async (req, res) => {
        if (!req.session) {
            return res.sendStatus(404)
        }
        const id = req.user.cartId
        const cart = await cartServices.getCartById(id)
        res.send(cart).status(200)
    },
    addToCart: async (req, res) => {
        const { cartId, productId } = req.params;
        await cartServices.addToCart(cartId, productId);
        res.sendStatus(200)
    },
    deleteProduct: async (req, res) => {
        const { cartId, productId } = req.params;
        const cart = await cartServices.deleteProduct(cartId, productId);
        res.status(200)
        return cart
    }
}
