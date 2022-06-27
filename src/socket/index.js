const MsgServices = require('../services/chatPlataform.services');
const moviesServices = require('../services/moviesPlataform.services');

module.exports = async (socket, req)  => {

socket.on("mensajes", async (data) => {
    await MsgServices.save(data);
    let arrayMsg = await MsgServices.getAll();
    socket.emit("mensajesCompleto", arrayMsg);
    socket.broadcast.emit("mensajesCompleto", arrayMsg);
});

if (await MsgServices.allLenght() !== 0) {
    socket.emit("mensajesCompleto", await MsgServices.getAll());
}
socket.on("send-pelis", async (data) => {
    await moviesServices.save(data);
    let array = await moviesServices.getAll()
    socket.emit("send-pelis-completo", array);
    socket.broadcast.emit("send-pelis-completo", array);
})
if (moviesServices.getAll() !== 0) {
    socket.emit("send-pelis-completo", await moviesServices.getAll());
    }
}