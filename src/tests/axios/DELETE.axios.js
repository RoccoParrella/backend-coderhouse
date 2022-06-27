const axios = require('axios');

const URL = 'http://localhost:8080/api/products';
const ID = 19

const main = async () => {
    try {
        const response = await axios.delete(URL + '/' + ID);
        console.log(response.data);
    }catch(e){
        console.log(e)
    }
}

main();