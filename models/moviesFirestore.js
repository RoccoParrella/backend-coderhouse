const { db } = require('../firebase');

class Movie {
    constructor() {
        this.model = db.collection('movies');
    }

    async create(obj) {
        let query = await this.model.get();
        let dataArray = query.docs.map(doc => doc.data());
        if (dataArray.length == 0) {
            obj.id = 1;
        } else {
            obj.id = await this.idProduct() + 1;
        }
        const movie = await this.model.doc(`${obj.id}`).set({
            
            id: obj.id,
            title: obj.title,
            tipo: obj.tipo,
            duration: obj.duration,
            urlImg: obj.urlImg
        })
        return movie;
    }

    async getAll() {
        let data = await this.model.get();
        let dataArray = data.docs.map(doc => doc.data());
        return dataArray;
    }

    async getById(id) {
        let data = await this.model.doc(`${id}`).get();
        let movie = data.data();
        return movie;
    }

    async updateById(id, obj) {
        await this.model.doc(`${id}`).set({
            id: id,
            title: obj.title,
            tipo: obj.tipo, 
            duration: obj.duration, 
            urlImg: obj.urlImg
        }) 
        return;
    }

    async deleteById(id) {
        await this.model.doc(`${id}`).delete();
        return;
    }

    async idProduct() {
        let array = await this.model.orderBy('id', 'desc').limit(1).get();
        let dataArray = array.docs.map(doc => doc.data());
        let id = dataArray[0].id;
        return id;
    }
}

module.exports = new Movie();