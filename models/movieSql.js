const knex = require('knex');
const fs = require('fs/promises');
const path = require('path');


class Movie {
    constructor() {
        this.db = knex({
            client: 'mysql',
            connection:  {
                host: 'localhost',
                port: 3306,
                user: 'root',
                password: '',
                database: 'prueba'
            },
        });
    }

    async getAll() {
        const movies = await this.db.select('*').from('movies');
        return movies;
    }

    async saveMovie(data) {
        await this.db("movies").insert({ title: data.titulo, tipo: data.tipo, duration: data.duracion, urlImg: data.img });
    }

    async loadData() {
        try {
            await this.db.schema.dropTableIfExists('movies');
            await this.db.schema.createTable('movies', (table) => {
                table.increments("id");
                table.string("title");
                table.string("tipo");
                table.string("duration");
                table.string("urlImg");
            })
            console.log('Tabla creada');
            let data = await fs.readFile(path.join(__dirname, "../database/productos.txt"), 'utf8');
            let array = JSON.parse(data);
            
            for (const item of array) {
                await this.db("movies").insert({
                    title: item.title,
                    tipo: item.tipo,
                    duration: item.duration,
                    urlImg: item.urlImg
                });
            };
        } catch (error) {
            console.log(error);
            throw error;
            
        } finally{
            this.db.destroy();
        }
    }

}

module.exports = new Movie();






