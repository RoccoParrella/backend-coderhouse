module.exports = (async  () => {
        const express = require('express');
        const mongoose = require('mongoose');
        const app = express()
        const server = require('http').Server(app)
        const path = require('path');
        const { Server } = require('socket.io');
        const io = new Server(server);
        const session = require('express-session');
        const config = require('./config');
        const engine = require('./engines');
        const chat = require('./socket/index');
        const logger = require('./log/winston');

        const passport = require('passport');
        const flash = require('express-flash');
        const initializePassport = require('./passport/local');

        const routerHome = require('./routes/router/home');
        const routerLogin = require('./routes/router/login');
        const apiCart = require('./routes/api/cart');
        const apiUser = require('./routes/api/user');
        const apiSend = require('./routes/api/sendMsg');

        mongoose.connect(config.MONGOURI).then(() => {
            initializePassport(passport)
            engine(app);
            app.use(express.json());
            app.use(express.urlencoded({ extended: true }));
            app.use(flash());
            app.use(session(config.MONGOSTORE))
            app.use(passport.initialize());
            app.use(passport.session());
            app.use("/static", express.static(path.join(__dirname, 'public')))
            
            io.on('connection', chat);

            // ROUTES
            app.use('/', routerHome);
            app.use('/', routerLogin);
            
            // APIS
            app.use('/api/user', apiUser);
            app.use('/api/cart', apiCart)
            app.use('/api/sms', apiSend)

        }).catch(err => {
            logger.error(err);
        });

        return server;
})()
