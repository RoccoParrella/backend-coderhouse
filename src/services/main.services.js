const moviesModel = require('../models/movie.model');
const ModelFactory = require('../models/model.factory');
const modelCart = ModelFactory.getModel('cart');
const modelUser = ModelFactory.getModel('user');
const modelChat = require('../models/message.model');

module.exports = {
    async getAllMovies() {
        const data = await moviesModel.getAll()
        return data;
    },
    async getByTipo(category) {
        return await moviesModel.getAllByTipo(category);
    },
    async saveProducts(title, tipo, duration, urlImg) {
        const obj = {
            titulo: title,
            tipo: tipo,
            duracion: duration,
            img: urlImg
        }
        console.log(obj)
        return await moviesModel.create(obj)
       
    },
    async updateProduct(id, title, tipo, duration, urlImg) {
        let obj = {title, tipo, duration, urlImg};
        return await moviesModel.updateById(id, obj)
    },
    async chatByEmail(email) {
        const data = await modelChat.getMsgByEmail(email);
        return data;
    },
    async deleteById(id) {
        return await moviesModel.deleteById(id)
    },
    async createUser(obj) {
        return await modelUser.save(obj)
    },
    async getUserById(id) {
        return await modelUser.getById(id);
    },
    async existsByEmail(email) {
        return await modelUser.existsByEmail(email);
    },
    async getByEmail(email) {
        return await modelUser.getByEmail(email);
    },
    async isPasswordValid(email, password) {
        return await modelUser.isPasswordValid(email, password);
    },
    async createCart() {
        return await modelCart.createCart();
    },
    async getCartById(cartId) {
        return await modelCart.getCartById(cartId);
    },
    async emptyCart(cartId) {
        return await modelCart.emptyCart(cartId);
    }
}