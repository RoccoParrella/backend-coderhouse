const LocalStrategy = require("passport-local").Strategy
const userModel = require('../models/user.js');
const logger = require("../log/winston");
const cartModel = require('../models/cartList.js')

module.exports = (passport) => {
    const authenticateUser = async (email, password, done) => {
        try {
            if (!await userModel.existsByEmail(email)) {
                logger.error(`El email ${email} no esta registrado!`);
                return done(null, false, { message: 'Usuario no registrado' });
            }
            if (!await userModel.isPasswordValid(email, password)) {
                logger.warn(`El password no es validad!`);
                return done(null, false, { message: 'Contraseña incorrecta' });
            }
            const user = await userModel.getByEmail(email);
            done(null, user);
        } catch (e) {
            logger.error(`Error al autenticar el usuario: ${e}`);
            return res.status(500).send({ message: `Error en el servidor: ${e}` });
        }
    }

    const registerUser = async  (req, email, password, done) => {
        const { name, lastname, pais, prefix, number } = req.body
        try {
            if (await userModel.existsByEmail(email)) {
                logger.error(`El email ${email} ya esta registrado!`);
                return done(null, false, { message: 'Usuario ya registrado' })
            }

            const cart = await cartModel.createCart()

            const user = await userModel.save({
                email,
                cartId: cart._id,
                password,
                name,
                img: "https://cardiologiaroca.com/wp-content/uploads/2015/11/sin-foto.png",
                lastname,
                country : pais,
                number: `${prefix}${number}` 
            })
            
            done(null, user)
        } catch (err) {
            logger.error(`Error al registrar el usuario: ${err}`);
            done(err)
        }
    }

    passport.use('login', new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, authenticateUser))
    passport.use('register', new LocalStrategy({ usernameField: 'email', passwordField: 'password', passReqToCallback: true }, registerUser))

    passport.serializeUser((user, done) => done(null, user))
    passport.deserializeUser((user, done) => done(null, user))
}

