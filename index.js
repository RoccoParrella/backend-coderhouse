(async () => {
    const express = require('express');
    const mongoose = require('mongoose');
    const app = express();
    const PORT = process.env.PORT || 8080;
    const server = app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}!`));
    const path = require('path');
    const { Server } = require('socket.io')
    const io = new Server(server);

    const { HOSTNAME, USER, OPTION, DATABASE, PASSWORD, SCHEMA } = require('./config');
    const engine = require('./engines/engine');
    const router = require(`./routes/home`);
    const routerMovies= require(`./routes/productos`);
    const routerCart = require(`./routes/carrito`);
    const routerFireProd = require(`./routes/productosFirestore`);
    const Sql = require('./controllers/sql');
    const Movie = require('./controllers/sqlite');


    // Connect to MongoDB
    mongoose.connect(`${SCHEMA}://${USER}:${PASSWORD}@${HOSTNAME}/${DATABASE}?${OPTION}`).then(() => {
        console.log('🥵Connected to MongoDB🥵');

        const motor = "pug";
        engine(app, motor);
        app.use(express.json());
        app.use("/static", express.static(path.join(__dirname, 'public')))
        app.use(express.urlencoded({ extended: true }));

        io.on('connection', async (socket) => {
            socket.on("mensajes", async (data) => {
                await Sql.all(data);
                let arrayMsg = await Sql.getAll();
                socket.emit("mensajesCompleto", arrayMsg);
                socket.broadcast.emit("mensajesCompleto", arrayMsg);
            });
            if (await Sql.allLenght() !== 0) {
                socket.emit("mensajesCompleto", await Sql.getAll());
            }
            socket.on("send-pelis", async (data) => {
                await Movie.saveMovie(data);
                let array = await Movie.getAll()
                socket.emit("send-pelis-completo", array);
                socket.broadcast.emit("send-pelis-completo", array);
            })
            if (Movie.allLenght() !== 0) {
                socket.emit("send-pelis-completo", await Movie.getAll());
            }
        });

        app.use(`/${motor}`, router);
        app.use(`/api`, routerMovies);
        app.use('/api', routerCart);
        app.use('/firestore', routerFireProd);

        server.on('error', (err) => {
            console.log(`Error: ${err} en el servidor`);
        });

    }).catch(err => {
        console.log(err);
    });
})()