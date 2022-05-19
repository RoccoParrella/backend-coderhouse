const LocalStrategy = require("passport-local").Strategy
const userModel = require('../models/user.js');
const logger = require("../log/winston");
const cartModel = require('../models/cartList.js')
const emailSender = require('../notifications/email');

module.exports = (passport) => {
    const authenticateUser = async (email, password, done) => {
        try {

            // Busca el usuario por su email

            if (!await userModel.existsByEmail(email)) {
                logger.error(`El email ${email} no esta registrado!`);
                return done(null, false, { message: 'Usuario no registrado' });
            }

            // Busca el usuario por su email lo comparo con la contraseña
        
            if (!await userModel.isPasswordValid(email, password)) {
                logger.warn(`El password no es validad!`);
                return done(null, false, { message: 'Contraseña incorrecta' });
            }

            // Si el usuario esta registrado y el password es valido, obtengo el usuario

            const user = await userModel.getByEmail(email);
            done(null, user);
        } catch (e) {
            logger.error(`Error al autenticar el usuario: ${e}`);
            return res.status(500).send({ message: `Error en el servidor: ${e}` });
        }
    }

    const registerUser = async (req, email, password, done) => {
        const { name, lastname, pais, prefix, number, edad } = req.body
        try {
            if (await userModel.existsByEmail(email)) {
                logger.error(`El email ${email} ya esta registrado!`);
                return done(null, false, { message: 'Usuario ya registrado' })
            }

            // Creo el el carrito

            const cart = await cartModel.createCart()

            // Creo el usuario y le paso el id del carrito
            
            const user = await userModel.save({
                email,
                cartId: cart._id,
                password,
                edad,
                name,
                img: "https://cardiologiaroca.com/wp-content/uploads/2015/11/sin-foto.png",
                lastname,
                country: pais,
                number: `${prefix}${number}`
            })

            // Armo mi template de email

            const template = `
                <h1>Se ha registrado un nuevo usuario!</h1>
                <ul>
                    <li>Nombre: ${name}</li>
                    <li>Apellido: ${lastname}</li>
                    <li>Email: ${email}</li>
                    <li>Edad: ${edad}</li>
                    <li>Pais: ${pais}</li>
                    <li>Telefono: ${prefix}${number}</li>
                </ul>
            `

            // Envio el email

            await emailSender.send(template, "nuevo registro", process.env.emailSender)
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

