

(async () => {

    const movie = require(`./models/movieSql`);

    await movie.loadData();
    
})()

