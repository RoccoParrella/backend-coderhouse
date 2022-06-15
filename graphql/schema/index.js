const { buildSchema } = require('graphql');

const schema = `
    type Movie {
        id: String!
        title: String
        tipo: String
        duracion: String
        urlImg: String
    }

    input MovieInput {
        title: String
        tipo: String
        duracion: String
        urlImg: String
    }

    type Query {
        getAllMovies(name: String): [Movie]
    }
    type Mutation {
        addMovie(data: MovieInput): Movie
    }
`

module.exports = buildSchema(schema);