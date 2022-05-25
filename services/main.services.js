const moviesModel = require('../models/movie.model');
const modelCart = require('../models/cart.model');
const modelUser = require('../models/user.model');
const { existsByEmail, isPasswordValid, getByEmail } = require('../models/user.model');

module.exports = {
    async getAllMovies() {
        const data = await moviesModel.getAll()
        return data;
    },
    async getByTipo(category) {
        return await moviesModel.getAllByTipo(category);
    },
    async saveProducts(title, tipo, duration, urlImg) {
        await moviesModel.create(title, tipo, duration, urlImg)
    },
    async createUser(obj) {
        modelUser.save(obj)
    },
    async getUserById(id) {
        return await modelUser.getById(id);
    },
    async existsByEmail(email) {
        return await existsByEmail(email);
    },
    async getByEmail(email) {
        return await getByEmail(email);
    },
    async isPasswordValid(email, password) {
        return await isPasswordValid(email, password);
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