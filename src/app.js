module.exports = (async () => {
    const Koa = require('koa');
    const app = new Koa()
    const body = require('koa-body');
    const PORT = process.env.PORT || 8080;
    const server = app.listen(PORT, () => console.log(`🥵Server is running on port ${PORT}🥵`))

    // const mongoose = require('mongoose');
    // const path = require('path');
    // const { Server } = require('socket.io');
    // const io = new Server(server);
    // const session = require('express-session');
    // const config = require('./config');
    // const engine = require('./engines');
    // const chat = require('./socket/index');
    // const logger = require('./log/winston');

    const home = require('./routes/router/home');

    // const passport = require('passport');
    // const flash = require('express-flash');
    // const initializePassport = require('./passport/local');

    // const routerHome = require('./routes/router/home');
    // const routerLogin = require('./routes/router/login');
    // const apiCart = require('./routes/api/cart');
    // const apiUser = require('./routes/api/user');
    // const apiSend = require('./routes/api/sendMsg');
    // const apiProducts = require('./routes/api/product');

    // mongoose.connect(config.MONGOURI).then(() => {
    //     initializePassport(passport)
    //     engine(app);

    //     app.use(express.json());
    //     app.use(express.urlencoded({ extended: true }));
    //     app.use(flash());
    //     app.use(session(config.MONGOSTORE))
    //     app.use(passport.initialize());
    //     app.use(passport.session());
    //     app.use("/static", express.static(path.join(__dirname, 'public')))

    //     io.on('connection', chat);

    //     // ROUTES
    //     app.use('/', routerHome);
    //     app.use('/', routerLogin);

    //     // APIS
    //     app.use('/api/user', apiUser);
    //     app.use('/api/cart', apiCart)
    //     app.use('/api/sms', apiSend)
    //     app.use('/api/products', apiProducts)

    // }).catch(err => {
    //     logger.error(err);
    // });
    app.use(body());
    app.use(home.routes());
    app.use(async (ctx) =>  ctx.body = 'Helloaa World!' );
    
    server.on('error', (err) => console.log('Error: ' + err));
})()
