const moviesModel = require('../models/movie.model');

module.exports = {
    async save(data) {
        await moviesModel.create(data);
    },
    async getAll() {
        let arrayGuardado = await moviesModel.getAll();
        return arrayGuardado;
    },
    async allLenght() {
        let arrayGuardado = await moviesModel.getAll();
        return arrayGuardado.length;
    }
}