const Contenedor = require('./clase');
const newProduct = new Contenedor('./productos.txt');
const express = require('express');
const app = express();


newProduct.save({ title: 'Pizza', price: '$600', thumbnail: `wwww.google.com/images/pizza`});
newProduct.save({ title: 'Empanda', price: '$120', thumbnail: `wwww.google.com/images/empanada`});
newProduct.save({ title: 'Faina', price: '$50', thumbnail: `wwww.google.com/images/faina`});


app.get('/productos', (req, res) => {
    res.send(JSON.stringify(newProduct.getAll()));   
});

app.get('/productoRandom', (req, res) => {
    let maxItems = newProduct.getAll().length;
    let randomNumber = Math.floor(Math.random() * ((maxItems + 1) - 1) + 1);
    res.send(newProduct.getById(randomNumber));
})

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}!`);
});

server.on('error', (err) => {
    console.log(`Error: ${err} en el servidor`);
});


