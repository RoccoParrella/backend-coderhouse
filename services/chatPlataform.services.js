const messageModel = require('../models/message.model');

module.exports = {
    async save(data) {
        await messageModel.saveMsg(data);
    },
    async getAll() {
        let arrayGuardado = await messageModel.readMsg();
        return arrayGuardado;
    },
    async allLenght() {
        let arrayGuardado = await messageModel.readMsg();
        return arrayGuardado.length;
    }
}