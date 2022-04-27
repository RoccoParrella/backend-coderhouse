(async () => {
    const express = require('express');
    const mongoose = require('mongoose');
    const app = express();
    const PORT = process.env.PORT || 8080;
    const server = app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}!`));
    const path = require('path');
    const { Server } = require('socket.io')
    const io = new Server(server);
    const session = require('express-session');
    const mongoStore = require('connect-mongo')

    const passport = require('passport');
    const flash = require('express-flash');
    const initializePassport = require('./passport/local');

    const engine = require('./engines/engine');
    const router = require(`./routes/home`);
    const Mongo = require('./controllers/Mongo');
    const moviesMongo = require('./models/moviesMongo');


    mongoose.connect(process.env.MONGOURL).then(() => {
        console.log('🥵Connected to MongoDB🥵');

        initializePassport(passport)

        engine(app);
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(flash());
        app.use(session({
            secret: 'secret',
            resave: true,
            saveUninitialized: true,
            store: new mongoStore({
                mongoUrl: process.env.MONGOURL,
                ttl: 10 * 60,
                expires: 1000 * 60 * 10,
                autoRemove: "native"
            })
        }))
        app.use(passport.initialize());
        app.use(passport.session());
        app.use("/static", express.static(path.join(__dirname, 'public')))

        io.on('connection', async (socket) => {
            socket.on("mensajes", async (data) => {
                await Mongo.all(data);
                let arrayMsg = await Mongo.getAll();
                socket.emit("mensajesCompleto", arrayMsg);
                socket.broadcast.emit("mensajesCompleto", arrayMsg);
            });
            if (await Mongo.allLenght() !== 0) {
                socket.emit("mensajesCompleto", await Mongo.getAll());
            }
            socket.on("send-pelis", async (data) => {
                await moviesMongo.save(data);
                let array = await moviesMongo.getAll()
                socket.emit("send-pelis-completo", array);
                socket.broadcast.emit("send-pelis-completo", array);
            })
            if (moviesMongo.getAllLenght() !== 0) {
                socket.emit("send-pelis-completo", await moviesMongo.getAll());
            }
        });

        app.use(`/`, router);

        server.on('error', (err) => {
            console.log(`Error: ${err} en el servidor`);
        });

    }).catch(err => {
        console.log(err);
    });
})()