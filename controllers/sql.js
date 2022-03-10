const moment = require('moment');
const Message = require('../models/messageSql');

class Sql {
    constructor() {
        this.array = [];
        this.arrayPelis = [];
    }

    async all(data) {
        data.hora = moment().format('D/MM/YY hh:mm');
        await Message.saveMsg(data);
    }

    async getAll() {
        let arrayGuardado = await Message.getAll();
        return arrayGuardado;
    }

    async allLenght() {
        let arrayGuardado = await Message.getAll();
        return arrayGuardado.length;
    }

    async loadData() {
        await Message.loadData();
    }
}

module.exports = new Sql();