const mongoStore = require('connect-mongo');

module.exports = {
    TWILIO_SID: 'AC332791fd8c4e9fd0a6b0999891a11d4c',
    TWILIO_TOKEN: 'e93f21532ebcf1e0f145636fb5ce6f22',
    MONGOURI: 'mongodb+srv://paella:M1o2n3g4o5@ecommerce.gazzm.mongodb.net/ecommerce?retryWrites=true&w=majority',
    MONGOSTORE: { secret: 'secret', resave: true, saveUninitialized: true, store: new mongoStore({ mongoUrl: 'mongodb+srv://paella:M1o2n3g4o5@ecommerce.gazzm.mongodb.net/ecommerce?retryWrites=true&w=majority', ttl: 10 * 60, expires: 1000 * 60 * 10, autoRemove: "native" })}}