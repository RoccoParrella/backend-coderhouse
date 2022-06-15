const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const products = require('./resolvers');

module.exports = (app) => {
    app.use('/graphql', graphqlHTTP({
        schema,
        rootValue: products,
        graphiql: true
    }));    
}