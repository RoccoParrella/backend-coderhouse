const assert = require('assert').strict
const mainServices = require('../../services/main.services')
const mongoose = require('mongoose')
const config = require('../../config')


describe('main.services.js', () => {

    before(async() => {
        await mongoose.connect(config.MONGOURI)
    })

    after(() => {
        mongoose.disconnect()
    })


    it('should connect to mongoDB', () => {
        assert.strictEqual(mongoose.connection.readyState, 1)
    })
    it('should return movies', async () => {
        const movies = await mainServices.getAllMovies()
        assert.strictEqual(movies.length !== 0, true)
    })

})