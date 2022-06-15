const axios = require('axios');

const URL = 'http://localhost:8080/api/products/post';

const main = async () => {
    try {
        let pelicula = {
            title: 'El senor de los anillos',
            tipo: 'peliculas',
            duration: '2:10',
            urlImg: 'https://www.elindependiente.com/wp-content/uploads/2017/11/el-senor-de-los-anillos-656x368.jpg'
        }
        const response = await axios.post(URL, pelicula);

        console.log(response.status);
    } catch (e) {
        console.log(e);
    }

}

main();