const { model, Schema } = require('mongoose');
const faker = require('faker');
const { normalize, schema } = require('normalizr');

class Message {
    constructor() {
        const mensajeSchema = new Schema({
            author: {
                email: String,
                name: String,
                lastName: String,
                urlImg: { type: String, default: faker.image.people() }
            },
            text: String
        });
        this.model = model('mensajes', mensajeSchema);
    }

    async saveMsg(data) {
        await this.model.create(data);
    }

    async readMsg() {
        const author = new schema.Entity('author', {}, { idAttribute: 'email' });
        const mensaje = new schema.Entity('mensajes', {
            author: author
        });
        const data = new schema.Entity('data', {
            mensajes: [mensaje]
        })
        const mensajesEnDB = await this.model.find({});
        const normalizedData = normalize({
            id: "mensajes",
            mensajes: mensajesEnDB
        }, data);
        return normalizedData
    }
}
module.exports = new Message();