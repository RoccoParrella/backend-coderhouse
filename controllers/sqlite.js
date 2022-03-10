const Movie = require('../models/movieSql');

class Sqlite {
    constructor() {
    }

    async saveMovie(data) {
        await Movie.saveMovie(data);
    }

    async getAll() {
        let arrayGuardado = await Movie.getAll();
        return arrayGuardado;
    }

    async allLenght() {
        let arrayGuardado = await Movie.getAll();
        return arrayGuardado.length;
    }

    async loadData() {
        await Movie.loadData();
    }
}

module.exports = new Sqlite();