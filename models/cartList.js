const mongoose = require('mongoose');
const moment = require('moment');

class CartList {
    constructor() {
        const schemma = new mongoose.Schema({
            products: Array,
            timestamp: { type: Date, default: Date.now },
            id: Number,
        });

        this.model = mongoose.model('carrito', schemma);
    }

    async createCart(obj) {
        let product = [];
        obj.id = 1;
        obj.time = moment().format("h:mm:ss");
        obj.title !== undefined ? product.push(obj) : null;
        let newId = await this.newId();
        let cartObj = await this.model.create({ id: newId, products: product });
        return cartObj;
    }

    async getAll(id) {
        let data = await this.model.find({ id: id });
        if (data.length !== 0) {
            let array = data[0].products;
            return array;
        }
        return false;
    }

    async deleteCart(id) {
        await this.model.deleteOne({ id: id });
        return;
    }

    async addProduct(id, product) {
        product.id = await this.newIdProduct(id);
        product.time = moment().format("h:mm:ss");
        await this.model.updateOne({ id: id }, { $push: { products: product } });
    }

    async deleteProduct(id, productId) {
        let idProduct = parseInt(productId);
        await this.model.updateOne({ id: id }, { $pull: { products: { id: idProduct } } });
    }

    async newId() {
        const data = await this.model.find({});
        if (data.length === 0) {
            return 1;
        }
        let lastObj = data[data.length - 1].id
        let newId = lastObj + 1;
        return newId;
    }

    async newIdProduct(id) {
        const data = await this.model.find({ id: id });
        const newData = data[0].products;
        if (newData.length === 0) {
            return 1;
        }
        let lastObj = newData[newData.length - 1].id
        let newId = lastObj + 1;
        return newId;
    }
}

module.exports = new CartList();