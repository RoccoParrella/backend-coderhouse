const Mongo = require('../controllers/Mongo');
const moviesMongo = require('../models/moviesMongo');

module.exports = async (socket, req)  => {

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
    await moviesMongo.create(data);
    let array = await moviesMongo.getAll()
    socket.emit("send-pelis-completo", array);
    socket.broadcast.emit("send-pelis-completo", array);
})
if (moviesMongo.getAllLenght() !== 0) {
    socket.emit("send-pelis-completo", await moviesMongo.getAll());
}

}