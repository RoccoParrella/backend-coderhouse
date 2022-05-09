module.exports = (async () => {
        const express = require('express');
        const mongoose = require('mongoose');
        const app = express()
        const server = require('http').Server(app)
        const path = require('path');
        const { Server } = require('socket.io')
        const io = new Server(server);
        const session = require('express-session');
        const mongoStore = require('connect-mongo');
        const dotenv = require('dotenv').config();

        const passport = require('passport');
        const flash = require('express-flash');
        const initializePassport = require('./passport/local');

        const router = require('./routes/home');
        const engine = require('./engines/engine');
        const chat = require('./socket/index');


        mongoose.connect("mongodb+srv://paella:M1o2n3g4o5@ecommerce.gazzm.mongodb.net/ecommerce?retryWrites=true&w=majority").then(() => {
            initializePassport(passport)
            
            engine(app);
            app.use(express.json());
            app.use(express.urlencoded({ extended: true }));
            app.use(flash());
            app.use(session({
                secret: 'secret',
                resave: true,
                saveUninitialized: true,
                store: new mongoStore({
                    mongoUrl: process.env.MONGOURL,
                    ttl: 10 * 60,
                    expires: 1000 * 60 * 10,
                    autoRemove: "native"
                })
            }))
            app.use(passport.initialize());
            app.use(passport.session());
            app.use("/static", express.static(path.join(__dirname, 'public')))

            io.on('connection', chat);
            app.use('/', router);

            server.on('error', (err) => {
                console.log(err);
            });

        }).catch(err => {
            console.log(err);
        });

        return server;
})()
