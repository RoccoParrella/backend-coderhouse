const fs = require('fs');

class Contenedor {
    constructor(filePath) {
        this.filePath = filePath;
        this.array = []
    }

    save = (obj) => {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            let array = this.array;
            let newId = array.length + 1;
            obj.id = newId;
            console.log(`A la ${obj.title} se le asocio el id N${obj.id}`);

            array.push(obj);
            fs.writeFileSync(this.filePath, JSON.stringify(array, null, 2));

            return data;
        } catch (err) {
            throw err;
        }
    }

    getById(id) {
        const data = fs.readFileSync(this.filePath, 'utf8')
        let newData = JSON.parse(data);
        console.log(newData.filter(e => e.id === id));

        return data;
    }

    getAll() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            if (data == '[]') {
                console.log("No hay ningun objeto, solo un array vacio!");
            } else {
                let newData = JSON.parse(data);
                console.log(newData);
            }
            return data;
        } catch (err) {
            throw err;
        }
    }

    deleteById(id) {
        const data = fs.readFileSync(this.filePath, 'utf8')
        let newData = JSON.parse(data);
        let result = newData.filter((item) => item.id !== id);
        fs.writeFileSync(this.filePath, JSON.stringify(result, null, 2))
    }

    deleteAll() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8')
            let newData = JSON.parse(data);
            newData = [];
            fs.writeFileSync(this.filePath, JSON.stringify(newData))
            console.log("Todos los objetos se han eliminado con exito!");
            return data;
        } catch (err) {
            throw err;
        }
    }
}


module.exports = Contenedor;