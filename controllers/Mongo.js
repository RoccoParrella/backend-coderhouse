const Message = require('../models/messageMongo');

class Mongo {

    async all(data) {
        await Message.saveMsg(data);
    }

    async getAll() {
        let arrayGuardado = await Message.readMsg();
        return arrayGuardado;
    }

    async allLenght() {
        let arrayGuardado = await Message.readMsg();
        return arrayGuardado.length;
    }
}

module.exports = new Mongo();