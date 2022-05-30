const { model } = require('mongoose');

class BaseModel {
    constructor(modelName, schema){
        this.model = model(modelName, schema);
    }

    // Return All

    async getAll() {
        return await this.model.find({}).lean();
    } 

    // Return by ID
    
    async getById(id) {
        return await this.model.findById(id).lean();
    }
}

module.exports = BaseModel;