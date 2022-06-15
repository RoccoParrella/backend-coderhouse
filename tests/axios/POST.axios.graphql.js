const axios = require('axios');

const URL = 'http://localhost:8080/graphql';

const main = async () => {

    await axios.post(URL, {
        query: `
            query {
                getAllMovies {
                    title,
                    tipo,
                    id,
                }
            }
        `
        },{
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(({data})=> console.log(data.data))



}

main();