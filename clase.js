const fs = require('fs');

class Contenedor {
    constructor(filePath) {
        this.filePath = filePath;
    }

    save(obj) {
        try {
            if(this.arrayLenght() == 0) {
                let array = [];
                obj.id = 1;
                console.log(`A la ${obj.title} se le asocio el id N${obj.id}`);
                array.push(obj);
                fs.writeFileSync(this.filePath, JSON.stringify(array, null, 2));
            } else {
                let data = fs.readFileSync(this.filePath, 'utf8')
                let array = JSON.parse(data);
                let newId = array.length + 1;
                !obj.id ? obj.id = newId : null
                let arrayOrdenado = array.sort(function(a, b) { return a.id-b.id });
                arrayOrdenado.push(obj);
                fs.writeFileSync(this.filePath, JSON.stringify(array, null, 2));
            }
        } catch (err) {
            throw err;
        }
    }

    arrayLenght() {
        const data = fs.readFileSync(this.filePath, 'utf8')
        let newData = JSON.parse(data);
        let length = newData.length;
        return length;
    }

    getById(id) {

        
        const data = fs.readFileSync(this.filePath, 'utf8')
        let newData = JSON.parse(data);
        let element = newData.filter(e => e.id == id)
        return element;
    }

    getAll() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            if (data == '[]') {
                console.log("No hay ningun objeto, solo un array vacio!");
            } else {
                let newData = JSON.parse(data);
                return newData;
            }
            
        } catch (err) {
            throw err;
        }
    }

    deleteById(id) {
        const data = fs.readFileSync(this.filePath, 'utf8')
        let newData = JSON.parse(data);
        let result = newData.filter((item) => item.id != id);
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