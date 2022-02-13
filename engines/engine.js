module.exports = function (app, engine) {
    app.set('views', './views/ejs')
    app.set('view engine', `${engine}`);
}