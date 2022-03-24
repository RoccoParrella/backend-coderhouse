const mongoose = require('mongoose');

class Movie {
    constructor() {
        const schemma = new mongoose.Schema({
            title: String,
            tipo: String,
            duration: String,
            urlImg: String,
            timestamp: { type: Date, default: Date.now },
            id: Number,
        });

        this.model = mongoose.model('movies', schemma);
    }

    async create(obj) {
        let data = await this.model.find({});
        if (data.length == 0) {
            obj.id = 1;
        } else {
            obj.id = await this.idProduct() + 1;
        }
        const movie = await this.model.create(obj)
        return movie;
    }

    async getAll() {
        let data = await this.model.find({});
        return data;
    }

    async getById(id) {
        let data = await this.model.find({ id: id });
        return data;
    }

    async updateById(id, obj) {
        await this.model.updateOne({ id: id }, { $set: { title: obj.title, tipo: obj.tipo, duration: obj.duration, urlImg: obj.urlImg } });
        return;
    }

    async deleteById(id) {
        let data = await this.model.deleteOne({ id: id });
        return;
    }

    async idProduct() {
        const data = await this.model.find({}).sort({ id: -1 }).limit(1);
        let id = data[0].id;
        return id;
    }
}

module.exports = new Movie();