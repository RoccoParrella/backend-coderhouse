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


// async loadData() {
//     try {
//         await this.db.schema.dropTableIfExists('movies');
//         await this.db.schema.createTable('movies', (table) => {
//             table.increments("id");
//             table.string("name");
//             table.string("tipo");
//             table.string("duracion");
//             table.string("img");
//         })
//         console.log('Tabla creada');
//         let data = await fs.readFile(path.join(__dirname, "../database/productos.txt"), 'utf8');
//         let array = JSON.parse(data);
        
//         for (const item of array) {
//             await this.db("movies").insert({
//                 name: item.title,
//                 tipo: item.tipo,
//                 duracion: item.duration,
//                 img: item.urlImg
//             });
//         };
//     } catch (error) {
//         console.log(error);
//         throw error;
        
//     } finally{
//         this.db.destroy();
//     }
// }



// this.db = knex({
//     client: 'mysql',
//     connection:  {
//         host: 'localhost',
//         port: 3306,
//         user: 'root',
//         password: '',
//         database: 'prueba'
//     }
// });