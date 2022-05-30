const userModel = require('../models/user.model');
const cartModel = require('../models/cart.model');

class ModelFactory  { 
    static getModel(modelName) {
        switch (modelName) {
            case  'user' :
                return userModel;
            case 'cart':
                return cartModel;
            default:
                throw new Error('Model not found');

        }
    }
}

module.exports = ModelFactory;