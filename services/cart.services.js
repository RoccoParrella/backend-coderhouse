const cartModel = require('../models/cart.model');

module.exports = {
    async getCartById(id) {
        const cart = await cartModel.getCartById(id)
        return cart;
    },
    async addToCart(cartId, productId) {
        await cartModel.addProduct(cartId, productId);
    },
    async deleteProduct(cartId, productId) {
        await cartModel.deleteProduct(cartId, productId);
    }
}