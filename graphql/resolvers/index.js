const ModelFactory = require('../../models/model.factory');
const movieModel = ModelFactory.getModel('movie');

module.exports = {
    addMovie: async ({data}) => {
        const product = await movieModel.create(data);
        return product;
    },
    getAllMovies: async ({name}) => movieModel.getAll()
}