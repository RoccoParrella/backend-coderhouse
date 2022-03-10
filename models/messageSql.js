const knex = require('knex');
const fs = require('fs/promises');
const path = require('path');


class Message {
    constructor() {
        this.db = knex({
            client: 'sqlite3',
            connection: {
                filename: './database/mensajes.sqlite'
            },
            useNullAsDefault: true
        })
    }

    async getAll() {
        const movies = await this.db.select('*').from('msg');
        return movies;
    }

    async saveMsg(data) {
        await this.db("msg").insert({ email: data.email, msg: data.msg, hora: data.hora });
    }

    async loadData() {
        try {
            await this.db.schema.dropTableIfExists('msg');
            await this.db.schema.createTable('msg', (table) => {
                table.string("email");
                table.string("msg");
                table.string("hora");
            })
            console.log('Tabla creada');
        } catch (error) {
            console.log(error);
            throw error;
            
        }
    }

}

module.exports = new Message();