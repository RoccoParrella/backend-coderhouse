const { Router } = require("express");
const router = new Router();
const auth = require('../middlewares/auth');
const { getLogin, getSignUp, getHome, getLogout, getBye, getSearch, getAdd, getResult, postAdd, getError, getErrorSignUp } = require('../controllers/home');
const passport = require('passport');
const logger = require('../log/pino');

router.get('/', auth, getHome);

router.get('/login', getLogin);

router.get("/numeros", (req, res) => {
    const { num, n } = req.query;
    console.log(num, n);    
    if (n == 0) {
        res.send("No se puede dividir entre 0");
        logger.error("No se puede dividir entre 0");
        return
    }

    res.send({
        result: num / n
    })
})

router.get('/signup', getSignUp);

router.get('/logout', getLogout)

router.get('/bye', getBye);

router.get("/error", getError)

router.get("/errorR", getErrorSignUp)

router.post('/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/error',
    failureFlash: true
}))

router.post("/signup", passport.authenticate('register', {
    successRedirect: '/',
    failureRedirect: '/errorR',
    failureFlash: true
}))

router.get(`/buscar`, auth, getSearch)

router.get('/add', auth, getAdd)

router.get('/result', auth, getResult)

router.post('/add', auth, postAdd)

module.exports = router;