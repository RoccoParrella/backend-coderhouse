const axios = require('axios');

const URL = 'http://localhost:8080/api/products';

const main = async () => {
  const response = await axios.get(URL);
  console.log(response);
}

main();