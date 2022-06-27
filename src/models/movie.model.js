const {Schema, model} = require('mongoose');
const logger = require('../log/winston');

class Movie{
    constructor() {
        const schemma = new Schema({
            title: String,
            tipo: String,
            duration: String,
            urlImg: String,
            timestamp: { type: Date, default: Date.now },
            id: Number,
        });

        this.model = model('movies', schemma);
    }

    async create(obj) {
        let data = await this.model.find({});
        if (data.length == 0) {
            obj.id = 1;
        } else {
            obj.id = await this.idProduct() + 1;
        }
        const movie = await this.model.create({title: obj.titulo, tipo: obj.tipo, duration: obj.duracion, urlImg: obj.img, id: obj.id});
        logger.info(`Se ha agregado con exito ${obj.titulo} con el id N${obj.id}`);
        return movie;
    }

    async getAll() {
        return await this.model.find({});
    } 

    async getById(id) {
        return await this.model.findOne({ id: id });
    }

    async getAllByTipo(tipo) {
        const tipoEnMayus = tipo.charAt(0).toUpperCase() + tipo.slice(1);
        logger.info(`${tipoEnMayus} obtenidas correctamente`);
        let data = await this.model.find({ tipo: tipo });
        return data;
    }

    async updateById(id, obj) {
        logger.info(`Se ha editado con exito ${obj.title} con el id N${id}`);
        await this.model.updateOne({ id: id }, { $set: { title: obj.title, tipo: obj.tipo, duration: obj.duration, urlImg: obj.urlImg } });
        return;
    }

    async deleteById(id) {
        logger.info(`Se ha eliminado con exito`);
        await this.model.deleteOne({ id: id });
        return;
    }

    async idProduct() {
        const data = await this.model.find({}).sort({ id: -1 }).limit(1);
        let id = data[0].id;
        return id;
    }

    async getAllLenght() {
        let data = await this.model.find({});
        return data.length;
    }
}

module.exports = new Movie();