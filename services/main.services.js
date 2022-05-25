const moviesModel = require('../models/movie.model');
const modelCart = require('../models/cart.model');
const modelUser = require('../models/user.model');

module.exports = {
    async getAllMovies() {
        const data = await moviesModel.getAll()
        return data;
    },
    async getByTipo(category) {
        return await moviesModel.getAllByTipo(category);
    },
    async saveProducts(title, tipo, duration, urlImg) {
        return await moviesModel.create(title, tipo, duration, urlImg)
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