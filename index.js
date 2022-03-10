const { Console } = require('console');
const { array, arrayPelis } = require('./controllers/sql');

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

    const motor = "pug";
    engine(app, motor);

    app.use(express.json());
    app.use("/static", express.static(path.join(__dirname, 'public')))
    app.use(express.urlencoded({ extended: true }));

    io.on('connection', async (socket) => {

        socket.on("mensajes", async (data) => {
            await Sql.all(data);
            let arrayGuardado = await Sql.getAll();
            socket.emit("mensajesCompleto", arrayGuardado);
            socket.broadcast.emit("mensajesCompleto", arrayGuardado);
        });
        if (await Sql.allLenght() !== 0) {
            socket.emit("mensajesCompleto", await Sql.getAll());
        }

        // socket.on("send-pelis", (data) => {
        //     let arrayPelis = Sql.pelis(data);
        //     socket.emit("send-pelis-completo", arrayPelis);
        //     socket.broadcast.emit("send-pelis-completo", arrayPelis);
        // })
        // console.log("Nueva conexión", arrayPelis);
        // if (arrayPelis.length !== 0) {
        //     socket.emit("send-pelis-completo", arrayPelis);
        // }

    })
    
    app.use(`/${motor}`, router);

    server.on('error', (err) => {
        console.log(`Error: ${err} en el servidor`);
    });
})()