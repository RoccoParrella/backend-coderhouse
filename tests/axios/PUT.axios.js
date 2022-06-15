const axios = require('axios');

const URL = 'http://localhost:8080/api/products';
const ID = 14

const main = async () => {
    let pelicula = {
        title: 'Duki',
        tipo: 'peliculas',
        duration: '2:10',
        urlImg: 'https://e.rpp-noticias.io/normal/2022/01/17/510651_1203384.jpg'
    }
    try {
        const response = await axios.put(`${URL}/${ID}`, pelicula);
        console.log(response.data);
    }catch(e){
        console.log(e)
    }
}

main();