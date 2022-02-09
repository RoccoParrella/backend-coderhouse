const Contenedor = require('./clase');
const newProduct = new Contenedor('./productos.txt');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
const productosRouter = require("./routes/home");

app.use('/', productosRouter);
app.use('/productos', productosRouter);


const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}!`);
});

server.on('error', (err) => {
    console.log(`Error: ${err} en el servidor`);
});


