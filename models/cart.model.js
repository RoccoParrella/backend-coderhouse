const mongoose = require('mongoose');
const moviesModel = require('../models/movie.model');

class CartList {
    constructor() {
        const schemma = new mongoose.Schema({
            products: Array,
            userId: Object,
        });
        this.model = mongoose.model('cartList', schemma);
    }

    // Crea un carrito cuando el usuario se registra y lo asigna a su id

    async createCart() {
        return await this.model.create({ products: [] });
    }

    // Trae el carrito de un usuario por su id

    async getCartById(id) {
        return await this.model.findById({ _id : id});
    }

    // Agrega un producto al carrito de un usuario

    async addProduct(id, productId) {
        let idProduct = parseInt(productId);
        const product = await moviesModel.getById(idProduct);
        await this.model.findByIdAndUpdate(id, { $push: { products: product[0] } });
    }

    // Vacio el carro de un usuario

    async emptyCart(id) {
        await this.model.findByIdAndUpdate(id , { $set: { products: [] } });
    }

    // Borra un producto del carrito de un usuario

    async deleteProduct(id, productId) {
        let idProduct = parseInt(productId);
        await this.model.updateOne({ id: id }, { $pull: { products: { id: idProduct } } });
    }
}

module.exports = new CartList();