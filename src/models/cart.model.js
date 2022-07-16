const { model, Schema } = require('mongoose');
const moviesModel = require('../models/movie.model');

class CartList {
    constructor() {
        const schemma = new Schema({
            products: Array,
            userId: Object,
        });
        this.model = model('cartList', schemma);
    }

    // Create a cart when the user registers and assign it to his id

    async createCart() {
        return await this.model.create({ products: [] });
    }

    // Get cart by id

    async getCartById(id) {
        return await this.model.findById({ _id : id});
    }

    // Add a product to a cart by user

    async addProduct(id, productId) {
        const product = await moviesModel.getById(productId);
        await this.model.findByIdAndUpdate(id, { $push: { products: product } });
    }

    // Empty cart by user

    async emptyCart(id) {
        await this.model.findByIdAndUpdate(id , { $set: { products: [] } });
    }

    // Delete product from cart by user

    async deleteProduct(id, productId) {
        let idProduct = parseInt(productId);
        await this.model.findByIdAndUpdate(id, { $pull: { products: { id: idProduct } } });
    }
}

module.exports = new CartList();