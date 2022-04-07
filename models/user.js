const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

class UserModel {
    constructor() {
        const schema = new Schema ({
            email: String,
            name: String,
            lastname: String,
            password: String
        })
        this.model = model('users', schema);
    }

    // Guarda usuario

    async save(user) {
        user.password = await bcrypt.hash(user.password, 10);
        await this.model.create(user);
        return user;
    }

    // Devuelve true or false

    existsByEmail(email) {
        return this.model.exists({ email });
    }

    // Devuelve un usuario por id

    async getById(id) {
        return await this.model.findById(id);
    }

    // Obtiene un usuario por email

    async getByEmail(email) { 
        const user = await this.model.findOne({ email });
        const usuario = {
            id: user._id,
            email: user.email,
            name: user.name,
            lastname: user.lastname,
            username: `${user.name} ${user.lastname}`
        }
        return usuario;
    }

    // Regresa true or false

    async isPasswordValid(email, password) {
        const user = await this.model.findOne({ email });
        return await bcrypt.compare(password, user.password);
    }
}

module.exports = new UserModel();