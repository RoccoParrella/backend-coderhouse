(async () => {
    const express = require('express');
    const app = express();
    const PORT = process.env.PORT || 8080;
    const server = app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}!`));
    const path = require('path');
    const { Server } = require('socket.io')
    const io = new Server(server);

    const engine = require('./engines/engine');
    const router = require(`./routes/home`);
    const Sql = require('./controllers/sql');
    const Movie = require('./controllers/sqlite');

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
    })
    
    app.use(`/${motor}`, router);

    server.on('error', (err) => {
        console.log(`Error: ${err} en el servidor`);
    });
})()